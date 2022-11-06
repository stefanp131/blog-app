using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace API.Controllers;

public class CommentariesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGenericRepository<Commentary> _commentaries;
    private readonly IMapper _mapper;

    public CommentariesController(IUnitOfWork unitOfWork, IGenericRepository<Commentary> commentaries, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _commentaries = commentaries;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<CommentaryDto>>> GetCommentaries([FromQuery] CommentariesSpecParams commentariesSpecParams)
    {
        IReadOnlyCollection<Commentary> commentaries;
        IReadOnlyCollection<CommentaryDto> commentaryDtos;

        if (commentariesSpecParams.PostId.HasValue && commentariesSpecParams.UserId.HasValue)
            return NoContent();
        
        if (commentariesSpecParams.PostId.HasValue)
        {
            commentaries = await _commentaries.ListAsync(new CommentariesPerPost(commentariesSpecParams));
            commentaryDtos = _mapper.Map<IReadOnlyCollection<CommentaryDto>>(commentaries);

            return Ok(new Pagination<CommentaryDto>(commentariesSpecParams.PageIndex, commentariesSpecParams.PageSize, commentaryDtos));

        } else if (commentariesSpecParams.UserId.HasValue)
        {
            commentaries = await _commentaries.ListAsync(new CommentariesPerUser(commentariesSpecParams));
            commentaryDtos = _mapper.Map<IReadOnlyCollection<CommentaryDto>>(commentaries);

            return Ok(new Pagination<CommentaryDto>(commentariesSpecParams.PageIndex, commentariesSpecParams.PageSize, commentaryDtos));
        }

        commentaries = await _commentaries.ListAllAsync();
        commentaryDtos = _mapper.Map<IReadOnlyCollection<CommentaryDto>>(commentaries);

        return Ok(commentaryDtos);
    }

    [HttpPost]
    public async Task<ActionResult> CreateCommentary([FromBody] CreateCommentaryDto createCommentaryDto)
    {
        var commentary = _mapper.Map<Commentary>(createCommentaryDto);

        await _commentaries.AddAsync(commentary);

        await _unitOfWork.Complete();

        return Ok();
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCommentary(int id, [FromBody] UpdateCommentaryDto updateCommentaryDto)
    {
        var commentary = await _commentaries.GetByIdAsync(id);
        _mapper.Map(updateCommentaryDto, commentary);
        _commentaries.Update(commentary);
        
        await _unitOfWork.Complete();

        return Ok();
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPatch("{id}")]
    public async Task<ActionResult> ApproveCommentary(int id, [FromBody] ApproveCommentaryDto approveCommentaryDto)
    {
        var commentary = await _commentaries.GetByIdAsync(id);
        _mapper.Map(approveCommentaryDto, commentary);
        _commentaries.Update(commentary);
        
        await _unitOfWork.Complete();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePost(int id)
    {
        var post = await _commentaries.GetByIdAsync(id);

        if (post != null)
        {
            _commentaries.Delete(post);
        }
        else
        {
            return NotFound();
        }
    
        await _unitOfWork.Complete();

        return NoContent();
    }
}