using DAL.Entities;

namespace DAL.Specifications;

public class CommentariesPerUser : BaseSpecifcation<Commentary>
{
    public CommentariesPerUser(int userId) : base(commentary => commentary.CreatedById == userId)
    {
        AddInclude(c => c.ForPost);
        AddInclude(c => c.CreatedBy);
    }
}