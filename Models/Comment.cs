namespace CommentsApp.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}