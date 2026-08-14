using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. CORS Ayarı
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// 2. Veritabanı Bağlantısı
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite("Data Source=todo.db"));

builder.Services.AddControllers(); // BU SATIR ÇOK ÖNEMLİ!

var app = builder.Build();

app.UseCors("AllowFrontend");

// Veritabanını otomatik oluşturalım
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    db.Database.EnsureCreated();
}

app.MapControllers(); // BU SATIR DA ÇOK ÖNEMLİ!

app.Run();