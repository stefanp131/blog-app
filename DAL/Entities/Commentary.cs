using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities;

public class Commentary : BaseEntity
{
    public Post Post { get; set; }
    public int PostId { get; set; }
    [Required]    
    public string CreatedBy { get; set; }
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [Required]
    [MaxLength(500)]
    public string Content { get; set; }
    [Required]
    public DateTime DateCreated { get; set; }
}