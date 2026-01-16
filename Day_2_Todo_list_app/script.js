// accessing elements 
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

//Saves it in the browser’s localStorage.
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = ""; // clear the ul to avoid duplicates

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    // INPUT TEXT
    let textElement;
    if (todo.isEditing) {
      textElement = document.createElement("input");
      textElement.type = "text";
      textElement.value = todo.text;
      textElement.focus();

      textElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(index, textElement.value);
      });
    } else {
      textElement = document.createElement("span");
      textElement.textContent = todo.text;
      if (todo.completed) textElement.classList.add("completed");
    }

    // ACTION BUTTONS
    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = todo.isEditing ? "Save" : "Edit";
    editBtn.onclick = () => {
      if (todo.isEditing) saveEdit(index, textElement.value);
      else startEdit(index);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(index);

    actions.append(editBtn, deleteBtn);

    li.append(checkbox, textElement, actions);
    todoList.appendChild(li);
  });
}

// -------------------------------- handlers -------------------------------------

// Start editing
function startEdit(index) {
  todos.forEach(todo => (todo.isEditing = false)); // only one edit at a time
  todos[index].isEditing = true;
  renderTodos();
}

// Save edited text
function saveEdit(index, newText) {
  if (newText.trim() === "") return;
  todos[index].text = newText.trim();
  todos[index].isEditing = false;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Add todo
addBtn.addEventListener("click", addTodo);

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  // check for the duplicate list 
  const isDuplicate = todos.some(
    todo => todo.text.toLowerCase() === text.toLowerCase()
  );

  if (isDuplicate) {
    alert("This todo already exists!");
    return;
  }

  todos.push({
    text,
    completed: false,
    isEditing: false
  });

  saveTodos();
  renderTodos();
  todoInput.value = "";
}

// keyboard enter key 
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
});

// Initial render
renderTodos();