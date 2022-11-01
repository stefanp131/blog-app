using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities;

public class Commentary : BaseEntity
{
    
    public Post ForPost { get; set; }
    public int ForPostId { get; set; }
    public AppUser CreatedBy { get; set; }
    public int CreatedById { get; set; }
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [Required]
    [MaxLength(500)]
    public string Content { get; set; }
    [Required]
    public DateTime DateCreated { get; set; }
}