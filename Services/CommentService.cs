using CommentsApp.Models;
using CommentsApp.Repositories;
using System.Collections.Generic;

namespace CommentsApp.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _repository;

        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Comment> GetAllComments()
        {
            return _repository.GetAll();
        }

        public Comment? GetCommentById(int id)
        {
            return _repository.GetById(id);
        }

        public Comment AddComment(Comment comment)
        {
            // Можно добавить дополнительную бизнес-логику здесь
            return _repository.Add(comment);
        }
        public Comment? UpdateComment(int id, Comment comment)
        {
            // Проверка существования комментария
            if (_repository.GetById(id) == null)
                return null;

            return _repository.Update(id, comment);
        }
        public Comment? DeleteComment(int id)
        {
            return _repository.Delete(id);
        }
    }
}