using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class PostDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [Required]
    [MaxLength(2000)]
    public string Content { get; set; }
    [Required]
    public DateTime DateCreated { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    [Required]
    public string Category { get; set; }
    public ICollection<CommentaryDto> Commentaries { get; set; }
}