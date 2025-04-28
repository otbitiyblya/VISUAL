using CommentsApp.Models;
using CommentsApp.Repositories;

namespace CommentsApp.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _repository;

        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Comment> GetAllComments() => _repository.GetAll();

        public Comment? GetCommentById(int id) => _repository.GetById(id);

        public Comment AddComment(Comment comment) => _repository.Add(comment);

        public Comment? UpdateComment(int id, Comment comment) => _repository.Update(id, comment);

        public Comment? DeleteComment(int id) => _repository.Delete(id);
    }
}