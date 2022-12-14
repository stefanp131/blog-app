using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateCommentaryDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [Required]
    [MaxLength(500)]
    public string Content { get; set; }
}