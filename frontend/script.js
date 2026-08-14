const STORAGE_KEY = "kilo.todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const emptyState = document.getElementById("empty-state");
const clearBtn = document.getElementById("clear-completed");
const themeToggle = document.getElementById("theme-toggle");

let todos = loadTodos();
let filter = "all";

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  const visible = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  list.innerHTML = "";
  visible.forEach((todo) => list.appendChild(createItem(todo)));

  const remaining = todos.filter((t) => !t.done).length;
  counter.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;

  emptyState.style.display = visible.length ? "none" : "block";

  if (visible.length > 1) enableDragAndDrop();
  else list.querySelectorAll(".drag-handle").forEach((h) => (h.style.display = "none"));
}

let dragId = null;

function enableDragAndDrop() {
  const items = [...list.querySelectorAll("li")];
  items.forEach((li) => {
    li.setAttribute("draggable", "true");
    const handle = li.querySelector(".drag-handle");
    if (handle) handle.style.display = "";

    li.addEventListener("dragstart", () => {
      dragId = Number(li.dataset.id);
      li.classList.add("opacity-40");
    });

    li.addEventListener("dragend", () => {
      dragId = null;
      items.forEach((el) => el.classList.remove("opacity-40"));
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      const targetId = Number(li.dataset.id);
      if (targetId !== dragId) moveTodo(dragId, targetId);
    });
  });
}

function moveTodo(fromId, toId) {
  const from = todos.findIndex((t) => t.id === fromId);
  const to = todos.findIndex((t) => t.id === toId);
  if (from === -1 || to === -1) return;
  const [moved] = todos.splice(from, 1);
  todos.splice(to, 0, moved);
  saveTodos();
  render();
}

function createItem(todo) {
  const li = document.createElement("li");
  li.className =
    "todo-item flex items-center gap-3 rounded-box bg-base-100 p-3 shadow-sm";
  li.dataset.id = todo.id;

  const handle = document.createElement("span");
  handle.className = "drag-handle cursor-grab select-none opacity-40 text-lg";
  handle.textContent = "⠿";
  handle.title = "Drag to reorder";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox checkbox-primary";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const span = document.createElement("span");
  span.className = "flex-1 " + (todo.done ? "line-through opacity-50" : "");
  span.textContent = todo.text;

  const del = document.createElement("button");
  del.className =
    "delete-btn btn btn-ghost btn-xs opacity-0 transition-opacity";
  del.textContent = "✕";
  del.addEventListener("click", () => removeTodo(todo.id, li));

  li.append(handle, checkbox, span, del);
  return li;
}

function addTodo(text) {
  todos.push({ id: Date.now(), text, done: false });
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
  saveTodos();
  render();
}

function removeTodo(id, li) {
  li.classList.add("removing");
  setTimeout(() => {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    render();
  }, 200);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
  input.focus();
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.toggle("btn-active", b === btn));
    render();
  });
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  render();
});

themeToggle.addEventListener("change", () => {
  document.documentElement.dataset.theme = themeToggle.checked ? "dark" : "cupcake";
});

render();
