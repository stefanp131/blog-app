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
        CreateMap<Commentary, CommentaryDto>()
            .ForMember(d => d.CreatedBy, o => o.MapFrom((src => src.CreatedBy.UserName)))
            .ForMember(d => d.ForPost, o => o.MapFrom((src => src.ForPost.Title)))
            .ForMember(d => d.ProfilePicture, o => o.MapFrom((src => src.CreatedBy.ProfilePicture)));
        CreateMap<CreatePostDto, Post>()
            .ForMember(d => d.DateCreated, o => o.MapFrom((src => DateTime.Now)))
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<UpdatePostDto, Post>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<CreateCommentaryDto, Commentary>()
            .ForMember(d => d.DateCreated, o => o.MapFrom((src => DateTime.Now)))
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<UpdateCommentaryDto, Commentary>()
            .ForMember(d => d.LastUpdated, o => o.MapFrom((src => DateTime.Now)));
        CreateMap<ApproveCommentaryDto, Commentary>();
        CreateMap<UpdateProfilePictureForUser, AppUser>();

    }
}