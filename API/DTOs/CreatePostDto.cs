using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreatePostDto
{
    [Required]
    [MaxLength(200, ErrorMessage = "Maximum length for a title is 200!")]
    public string Title { get; set; }
    [Required]
    [MaxLength(500, ErrorMessage = "Maximum length for a summary is 500!")]
    public string Summary { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    public string Category { get; set; }
}