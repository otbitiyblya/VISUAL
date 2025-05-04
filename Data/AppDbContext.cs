using Microsoft.EntityFrameworkCore;
using CommentsApp.Models;

namespace CommentsApp.Data
{
    public class AppDbContext : DbContext
    {
        // Конструктор для внедрения зависимостей
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) 
        {
        }

        // DbSet для работы с таблицей Comments
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Настройка значения по умолчанию для CreatedAt
            modelBuilder.Entity<Comment>()
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            // Можно добавить другие настройки модели
            modelBuilder.Entity<Comment>()
                .Property(c => c.Author)
                .HasMaxLength(100)
                .IsRequired();
                
            modelBuilder.Entity<Comment>()
                .Property(c => c.Text)
                .IsRequired();
        }
    }
}