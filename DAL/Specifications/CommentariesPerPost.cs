using DAL.Entities;

namespace DAL.Specifications;

public class CommentariesPerPost : BaseSpecifcation<Commentary>
{
    public CommentariesPerPost(int postId) : base(commentary => commentary.ForPostId == postId)
    {
        AddInclude(c => c.ForPost);
        AddInclude(c => c.CreatedBy);
    }
}