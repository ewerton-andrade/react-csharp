using System.Reflection.Metadata.Ecma335;
using back;
using back.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddMvc();
// builder.Services.AddHealthChecks();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy", policy => {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

//////////////////////////

app.MapGet("/user", async () => {
    AppDbContext db = new AppDbContext();
    return db.Users;
}); 

// app.MapGet("/todoitems/username", async (AppDbContext db) =>
//     await db.Users.Where(t => t.UserName == username).ToListAsync());

// app.MapGet("/todoitems/{id}", async (int id, AppDbContext db) =>
//     await db.Users.FindAsync(id)
//         is User todo
//             ? Results.Ok(todo)
//             : Results.NotFound());

// app.MapPost("/todoitems", async (User todo, AppDbContext db) =>
// {
//     db.Users.Add(todo);
//     await db.SaveChangesAsync();

//     return Results.Created($"/todoitems/{todo.Id}", todo);
// });

// app.MapPut("/todoitems/{id}", async (int id, User inputTodo, AppDbContext db) =>
// {
//     var todo = await db.Users.FindAsync(id);

//     if (todo is null) return Results.NotFound();

//     todo.Name = inputTodo.Name;
//     todo.IsComplete = inputTodo.IsComplete;

//     await db.SaveChangesAsync();

//     return Results.NoContent();
// });

// app.MapDelete("/todoitems/{id}", async (int id, AppDbContext db) =>
// {
//     if (await db.Users.FindAsync(id) is User todo)
//     {
//         db.Users.Remove(todo);
//         await db.SaveChangesAsync();
//         return Results.NoContent();
//     }

//     return Results.NotFound();
// });
 

//////////////////////////




app.MapGroup("/identity").MapIdentityApi<IdentityUser>();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
