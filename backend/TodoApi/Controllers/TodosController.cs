using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodosController(TodoDbContext context)
        {
            _context = context;
        }

        // GET: api/todos (Kayıtlı görevleri listeler)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // POST: api/todos (Yeni görev ekler)
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            // Veri eklendikten sonra HTTP 201 (Oluşturuldu) döner
            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }
    }
}