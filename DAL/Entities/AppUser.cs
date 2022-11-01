using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DAL.Entities;

public class AppUser : IdentityUser<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; }
    public ICollection<Commentary> Commentaries { get; set; } 
}