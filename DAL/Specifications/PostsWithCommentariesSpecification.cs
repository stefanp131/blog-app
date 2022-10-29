using DAL.Entities;

namespace DAL.Specifications;

public class PostsWithCommentariesSpecification : BaseSpecifcation<Post>
{
    public PostsWithCommentariesSpecification() : base()
    {
        AddInclude(post => post.Commentaries);
    }
}