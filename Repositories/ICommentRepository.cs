using CommentsApp.Models;
using System.Collections.Generic;

namespace CommentsApp.Repositories
{
    public interface ICommentRepository
    {

        IEnumerable<Comment> GetAll();

        Comment? GetById(int id);

        Comment Add(Comment comment);

        Comment? Update(int id, Comment comment);

        Comment? Delete(int id);
    }
}