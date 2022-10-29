using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PostsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGenericRepository<Post> _posts;
    private readonly IMapper _mapper;

    public PostsController(IUnitOfWork unitOfWork, IGenericRepository<Post> posts, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _posts = posts;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<PostDto>>> GetSimplePosts([FromQuery] bool commentaries)
    {
        IReadOnlyList<Post> posts;
        if (commentaries)
        {
            posts = await _posts.ListAsync(new PostsWithCommentariesSpecification());
        }
        else
        {
            posts = await _posts.ListAllAsync();
        }
        
        var postDtos = _mapper.Map<IReadOnlyCollection<Post>>(posts);

        return Ok(postDtos);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePost([FromBody] CreatePostDto createPostDto)
    {
        var post = _mapper.Map<Post>(createPostDto);

        await _posts.AddAsync(post);

        await _unitOfWork.Complete();

        return Ok();
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePost(int id, [FromBody] UpdatePostDto updatePostDto)
    {
        var post = await _posts.GetByIdAsync(id);
        _mapper.Map(updatePostDto, post);
        _posts.Update(post);
        
        await _unitOfWork.Complete();

        return Ok();
    }
}