// Wait until the DOM is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  // Global Variables
  const todoContainer = document.getElementById("todo-container"); // Container to hold all the todo items
  const taskInput = document.getElementById("taskInput"); // Input field where users type in their tasks
  const taskInputHandler = document.getElementById("taskInputHandler"); // Form that handles task submission

  // Event listener for task submission
  taskInputHandler.addEventListener("submit", (ev) => {
    ev.preventDefault(); // Prevent the default form submission behavior

    // Create elements for a new todo item
    const status = document.createElement("span"); // Status indicator (e.g., completed/not completed)
    const task = document.createElement("p"); // Paragraph element to display the task text
    const deleteBtn = document.createElement("span"); // Delete button to remove the task

    // Assign classes to the elements
    status.className = "status"; // Class for the status indicator
    task.className = "task"; // Class for the task text
    deleteBtn.className = "delete"; // Class for the delete button

    // Set the task text and delete button content
    task.innerText = taskInput.value; // Set the task text from the input field
    deleteBtn.innerHTML = `<i class="fa-solid fa-x"></i>`; // Set the delete button icon

    // Create a new div element to represent the todo item
    const todo = document.createElement("div");
    todo.className = "todo"; // Class for the todo item

    // Append the status, task, and delete button to the todo item
    todo.appendChild(status);
    todo.appendChild(task);
    todo.appendChild(deleteBtn);

    // Add the new todo item to the container
    todoContainer.appendChild(todo);

    // Clear the input field after adding the task
    taskInput.value = "";

    // Save the current state of the todo list to local storage
    saveData();
  });

  // Event listener for interactions with todo items (e.g., marking as completed, deleting)
  todoContainer.addEventListener("click", (el) => {
    const target = el.target;

    // Toggle the 'active' class on the todo item to mark it as completed or not
    if (target.classList[0] === "todo") {
      target.classList.toggle("active");
    } 
    // Delete the todo item if the delete button is clicked
    else if (el.target.className == "delete") {
      target.parentElement.remove();
    }

    // Save the updated state of the todo list to local storage
    saveData();
  });

  // Function to save the current state of the todo list to local storage
  const saveData = () => {
    window.localStorage.setItem("todoData", todoContainer.innerHTML);
  };

  // Load the todo list from local storage when the page is loaded
  todoContainer.innerHTML = localStorage.getItem("todoData");
});
