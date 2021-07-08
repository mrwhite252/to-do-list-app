//selector

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//function

function addTodo(event) {
  //   prevent form from auto submitting

  event.preventDefault();

  // create todo div

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //   create todo list

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  //add todo to local storage

  saveLocalTodos(todoInput.value);

  // Check mark button

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"> </i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // Check trash button

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to ul list

  todoList.appendChild(todoDiv);

  // clear todo input value

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // delete todo

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //add animation
    todo.classList.add("fall");

    //wait until the animation finished then excute the rest

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
