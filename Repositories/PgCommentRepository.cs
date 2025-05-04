using CommentsApp.Models;
using CommentsApp.Data;
using Microsoft.EntityFrameworkCore;

namespace CommentsApp.Repositories
{
    public class PgCommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        // Внедрение зависимости через конструктор
        public PgCommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Comment> GetAll()
        {
            // Используем ToList() для немедленного выполнения запроса
            return _context.Comments
                .OrderBy(c => c.Id)
                .ToList();
        }

        public Comment? GetById(int id)
        {
            // Find ищет по первичному ключу
            return _context.Comments.Find(id);
        }

        public Comment Add(Comment comment)
        {
            // Добавляем комментарий в контекст
            _context.Comments.Add(comment);
            
            // Сохраняем изменения в БД
            _context.SaveChanges();
            
            // Возвращаем добавленный комментарий (с заполненным Id)
            return comment;
        }

        public Comment? Update(int id, Comment comment)
        {
            // Находим существующий комментарий
            var existingComment = _context.Comments.Find(id);
            if (existingComment == null) 
                return null;

            // Обновляем поля
            existingComment.Author = comment.Author;
            existingComment.Text = comment.Text;
            existingComment.Email = comment.Email;

            // Сохраняем изменения
            _context.SaveChanges();
            
            return existingComment;
        }

        public Comment? Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null) 
                return null;

            // Удаляем комментарий
            _context.Comments.Remove(comment);
            _context.SaveChanges();
            
            return comment;
        }
    }
}