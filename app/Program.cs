using CommentsApp.Models;
using CommentsApp.Repositories;
using CommentsApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Регистрация сервисов
builder.Services.AddSingleton<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();

// Настройка CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Настройка логгирования
builder.Logging.AddConsole();

var app = builder.Build();

// Middleware
app.UseCors();
app.UseHttpsRedirection();

// Логгирование запросов
app.Use(async (context, next) =>
{
    Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path}");
    await next();
    Console.WriteLine($"Response: {context.Response.StatusCode}");
});

// Endpoints
app.MapGet("/comments", (CommentService service) =>
{
    return Results.Ok(service.GetAllComments());
});

app.MapGet("/comments/{id}", (int id, CommentService service) =>
{
    var comment = service.GetCommentById(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.MapPost("/comments", (Comment comment, CommentService service) =>
{
    if (string.IsNullOrEmpty(comment.Text) || string.IsNullOrEmpty(comment.Author))
    {
        return Results.BadRequest("Text and Author are required");
    }
    
    var createdComment = service.AddComment(comment);
    return Results.Created($"/comments/{createdComment.Id}", createdComment);
});

app.MapPatch("/comments/{id}", (int id, Comment comment, CommentService service) =>
{
    var existingComment = service.GetCommentById(id);
    if (existingComment is null) return Results.NotFound();
    
    var updatedComment = service.UpdateComment(id, comment);
    return Results.Ok(updatedComment);
});

app.MapDelete("/comments/{id}", (int id, CommentService service) =>
{
    var comment = service.DeleteComment(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.Run();