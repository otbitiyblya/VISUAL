using CommentsApp.Data;
using CommentsApp.Repositories;
using CommentsApp.Services;
using CommentsApp.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Конфигурация подключения к PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=comments_app;Username=postgres;Password=postgres";

// 2. Регистрация DbContext с использованием PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// 3. Регистрация зависимостей
builder.Services.AddScoped<ICommentRepository, PgCommentRepository>();
builder.Services.AddScoped<CommentService>();

// 4. Настройка CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React приложение
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 5. Применение миграций автоматически при запуске
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate(); // Применяет все pending миграции
        
        // Можно добавить начальные данные
        if (!dbContext.Comments.Any())
        {
            dbContext.Comments.AddRange(
                new Comment { Author = "Admin", Text = "Welcome!", Email = "admin@example.com" },
                new Comment { Author = "User", Text = "First comment", Email = "user@example.com" }
            );
            dbContext.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

// 6. Middleware pipeline
app.UseCors();

// 7. Endpoints
app.MapGet("/comments", (CommentService service) => 
{
    var comments = service.GetAllComments();
    return Results.Ok(comments);
});

app.MapGet("/comments/{id}", (int id, CommentService service) => 
{
    var comment = service.GetCommentById(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.MapPost("/comments", (Comment comment, CommentService service) =>
{
    // Валидация
    if (string.IsNullOrEmpty(comment.Text)) 
        return Results.BadRequest("Text is required");
    if (string.IsNullOrEmpty(comment.Author))
        return Results.BadRequest("Author is required");
    
    var createdComment = service.AddComment(comment);
    return Results.Created($"/comments/{createdComment.Id}", createdComment);
});

app.MapPatch("/comments/{id}", (int id, Comment comment, CommentService service) =>
{
    var updatedComment = service.UpdateComment(id, comment);
    return updatedComment is not null ? Results.Ok(updatedComment) : Results.NotFound();
});

app.MapDelete("/comments/{id}", (int id, CommentService service) =>
{
    var comment = service.DeleteComment(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.Run();