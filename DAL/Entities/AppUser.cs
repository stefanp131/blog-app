using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DAL.Entities;

public class AppUser : IdentityUser<int>
{
    public string ProfilePicture { get; set; }
    public ICollection<AppUserRole> UserRoles { get; set; }
    public ICollection<Commentary> Commentaries { get; set; } 
}