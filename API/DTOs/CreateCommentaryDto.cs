using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateCommentaryDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [Required]
    [MaxLength(500)]
    public string Content { get; set; }
    public int CreatedById { get; set; }
    public int ForPostId { get; set; }

}