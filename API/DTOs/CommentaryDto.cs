using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CommentaryDto
{
    public int Id { get; set; }
    public bool Approved { get; set; }
    public string ForPost { get; set; }
    public string CreatedBy { get; set; }
    public string ProfilePicture { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime LastUpdated { get; set; }
}