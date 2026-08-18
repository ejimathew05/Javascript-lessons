const todo = JSON.parse(localStorage.getItem("saveTodoList")) || [];
function renderTaskInput() {
  let todoInnerHTML = "";
  todo.forEach(function (todoObject, index) {
    //deconstructing
    // const todoText = todoObject.todoText;
    const { todoText, dueDate } = todoObject;

    //Generating the html
    const html = `<div>${todoText}</div>
                  <div>${dueDate} </div>
                  <button
                  class="delete-button click-to-delete" 
                  >Delete</button>`;
    todoInnerHTML += html;
  });
  //Displaying the generated HTML
  document.querySelector(".js-outputhtml").innerHTML = todoInnerHTML;

  document.querySelectorAll(".click-to-delete").forEach((deleteID, index) => {
    deleteID.addEventListener("click", () => {
      todo.splice(index, 1); // Removes 1 element at the specified index
      renderTaskInput(); // Refresh the UI
      saveTodo();
    });
  });
}

renderTaskInput(); //displays the todo list

// Function to delete task.
function deleteTask(index) {
  todo.splice(index, 1); // Removes 1 element at the specified index
  renderTaskInput(); // Refresh the UI
  saveTodo(); //after deleting it also removes the array in the saved data
}

function addTask() {
  let todoInput = document.querySelector(".js-todo-list");
  let todoDate = document.querySelector(".js-todo-date");
  const todoText = todoInput.value;
  const dueDate = todoDate.value;
  if (todoText.trim() === "") {
    alert("Todo List is empty");
    return;
  }
  todo.push({ dueDate, todoText });
  renderTaskInput();
  saveTodo();
  todoInput.value = "";
  todoInput.focus();
}

document.querySelector(".add-listener").addEventListener("click", () => {
  addTask();
});

document.querySelector(".enterKey").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function saveTodo() {
  localStorage.setItem("saveTodoList", JSON.stringify(todo));
}
