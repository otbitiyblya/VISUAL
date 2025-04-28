using CommentsApp.Models;

namespace CommentsApp.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly Dictionary<int, Comment> _comments = new();
        private int _nextId = 1;

        public CommentRepository()
        {
            // Иниц тестовых данных
            Add(new Comment { Text = "First comment", Author = "User1" });
            Add(new Comment { Text = "Second comment", Author = "User2" });
        }

        public IEnumerable<Comment> GetAll() => _comments.Values.OrderBy(c => c.Id);

        public Comment? GetById(int id) => _comments.TryGetValue(id, out var comment) ? comment : null;

public Comment Add(Comment comment)
{
    comment.Id = _nextId++;
    comment.CreatedAt = DateTime.UtcNow;
    _comments[comment.Id] = comment;
    return comment;
}

public Comment? Update(int id, Comment comment)
{
    if (!_comments.ContainsKey(id)) return null;
    
    var existingComment = _comments[id];
    existingComment.Author = comment.Author ?? existingComment.Author;
    existingComment.Text = comment.Text ?? existingComment.Text;
    existingComment.Email = comment.Email ?? existingComment.Email;
    
    return existingComment;
}

        public Comment? Delete(int id)
        {
            if (!_comments.TryGetValue(id, out var comment)) return null;
            
            _comments.Remove(id);
            return comment;
        }
    }
}