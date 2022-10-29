using API.DTOs;
using AutoMapper;
using DAL.Entities;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {   
        CreateMap<RegisterDto, AppUser>();
        CreateMap<CreatePostDto, Post>();
        CreateMap<UpdatePostDto, Post>();
    }
}