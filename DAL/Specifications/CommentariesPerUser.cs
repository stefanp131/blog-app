using DAL.Entities;

namespace DAL.Specifications;

public class CommentariesPerUser : BaseSpecifcation<Commentary>
{
    public CommentariesPerUser(CommentariesSpecParams commentariesSpecParams) : base(commentary => commentary.CreatedById == commentariesSpecParams.UserId 
        && (string.IsNullOrEmpty(commentariesSpecParams.Search) || commentary.Title.ToLower().Contains(commentariesSpecParams.Search) 
                                                                || commentary.Content.ToLower().Contains(commentariesSpecParams.Search))
        && (!commentariesSpecParams.Approved.HasValue || commentary.Approved == commentariesSpecParams.Approved))
    {   
        AddInclude(c => c.ForPost);
        AddInclude(c => c.CreatedBy);
        AddOrderBy(n => n.DateCreated);
        ApplyPaging(commentariesSpecParams.PageSize * (commentariesSpecParams.PageIndex - 1), commentariesSpecParams.PageSize);
        
        if (!string.IsNullOrEmpty(commentariesSpecParams.Sort))
        {
            switch (commentariesSpecParams.Sort)
            {
                case "lastUpdatedAsc":
                    AddOrderBy(c => c.LastUpdated);
                    break;
                case "lastUpdatedDesc":
                    AddOrderByDescending(c => c.LastUpdated);
                    break;
                case "dateCreatedAsc":
                    AddOrderBy(c => c.DateCreated);
                    break;
                case "dateCreatedDesc":
                    AddOrderByDescending(c => c.DateCreated);
                    break;
                default:
                    AddOrderBy(n => n.DateCreated);
                    break;
            }
        }
    }
}