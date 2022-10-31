using System;
using API.DTOs;
using AutoMapper;
using DAL.Entities;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {   
        CreateMap<RegisterDto, AppUser>();
        CreateMap<CreatePostDto, Post>()
            .ForMember(d =>d.LastUpdated, o => o.MapFrom((src => DateTime.Now)))
            .ForMember(d=>d.Summary, o => o.MapFrom(src => src.Content.Substring(0,200)));
        CreateMap<UpdatePostDto, Post>()
            .ForMember(d =>d.LastUpdated, o => o.MapFrom((src => DateTime.Now)))
            .ForMember(d=>d.Summary, o => o.MapFrom(src => src.Content.Substring(0,200)));;
    }
}