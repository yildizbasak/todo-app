using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodosController(TodoDbContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // POST: api/todos
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            // DİKKAT: Burası CreatedAtAction değil, basitçe Ok ile dönelim (bazen rota ismi uyuşmazlığı yapar)
            return Ok(todo); 
        }
                // PUT: api/todos/{id} (Görevi Tamamlandı/Beklemede olarak günceller)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, Todo updatedTodo)
        {
            // Veritabanında o id'ye sahip görevi arıyoruz
            var todo = await _context.Todos.FindAsync(id);
            
            // Eğer görev yoksa "404 Bulunamadı" hatası döndür
            if (todo == null)
            {
                return NotFound();
            }

            // Görevin durumunu (Tamamlandı/Beklemede) güncelliyoruz
            todo.IsCompleted = updatedTodo.IsCompleted;

            // Değişiklikleri veritabanına kaydet
            await _context.SaveChangesAsync();

            return NoContent(); // Başarılı oldu, geriye boş cevap (204) döndür
        }

        // DELETE: api/todos/{id} (Görevi Siler)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            // Veritabanında o id'ye sahip görevi arıyoruz
            var todo = await _context.Todos.FindAsync(id);

            // Eğer görev yoksa "404 Bulunamadı" hatası döndür
            if (todo == null)
            {
                return NotFound();
            }

            // Görevi veritabanından sil
            _context.Todos.Remove(todo);
            
            // Değişiklikleri kaydet
            await _context.SaveChangesAsync();

            return NoContent(); // Başarılı oldu, geriye boş cevap (204) döndür
        }
    }
}