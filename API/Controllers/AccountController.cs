using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IUnitOfWork _unitOfWork;

    public AccountController(ITokenService tokenService, IMapper mapper, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IUnitOfWork unitOfWork)
    {
        this._tokenService = tokenService;
        this._mapper = mapper;
        this._userManager = userManager;
        this._signInManager = signInManager;
        _unitOfWork = unitOfWork;
    }
    
    [Authorize()]
    [HttpGet("{id}/picture")]
    public async Task<ActionResult<string>> GetProfilePicture(int id)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(
            new {
            ProfilePicture = user.ProfilePicture
        });
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        var user = this._mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.Username.ToLower();

        var result = await this._userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        var roleResult = await this._userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded) return BadRequest(result.Errors);

        return new UserDto
        {
            Username = user.UserName,
            Token = await this._tokenService.CreateToken(user),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await this._userManager.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username");

        var result = await this._signInManager
            .CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized();

        return new UserDto
        {
            Username = user.UserName,
            Token = await this._tokenService.CreateToken(user),
        };
    }
    
    [Authorize()]
    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateProfilePicture(int id, [FromBody] UpdateProfilePictureForUser updateProfilePictureForUser)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        _mapper.Map(updateProfilePictureForUser, user);
        await _unitOfWork.Complete();

        return Ok();
    }

    private async Task<bool> UserExists(string username)
    {
        return await this._userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
    
}