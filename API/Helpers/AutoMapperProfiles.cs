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
        CreateMap<Post, PostDto>();
        CreateMap<Commentary, CommentaryDto>().ForMember(d => d.CreatedBy, o => o.MapFrom((src => src.CreatedBy.UserName)));;
        CreateMap<CreatePostDto, Post>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<UpdatePostDto, Post>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<CreateCommentaryDto, Commentary>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<UpdateCommentaryDto, Commentary>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<ApproveCommentaryDto, Commentary>();
    }
}