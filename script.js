/** @format */

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.getElementById("name");
  const newTodoFrom = document.getElementById("todo-form");

  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();
    //elements.content.value
    //the content is the name of the input field

    DisplayTodos();
  });
});

function DisplayTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const span = document.createElement("span");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const content = document.createElement("div");
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    deleteBtn.classList.add("delete");
    edit.classList.add("edit");
    actions.classList.add("actions");

    content.innerHTML = ` <input type="text" value="${todo.content}" readonly />`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });
    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      // todos = todos.filter((todo) => todo.createdAt != todo.createdAt);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
