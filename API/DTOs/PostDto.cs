using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class PostDto
{

    public int Id { get; set; }
    public string Title { get; set; }
    public string Summary { get; set; }
    public string Content { get; set; }
    public DateTime DateCreated { get; set; }
    public string Category { get; set; }
    public DateTime LastUpdated { get; set; }
    public ICollection<CommentaryDto> Commentaries { get; set; }
}