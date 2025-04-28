namespace CommentsApp.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string? Author { get; set; }  // Соответствует name в React
        public string? Text { get; set; }    // Соответствует body в React
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}