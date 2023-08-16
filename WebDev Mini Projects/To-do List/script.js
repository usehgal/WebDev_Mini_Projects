// script.js

// Get references to the DOM elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Function to create a new task item
function createTaskItem(taskText) {
    const taskItem = document.createElement("li");
    const taskTextSpan = document.createElement("span");
    const removeButton = document.createElement("button");

    taskTextSpan.textContent = taskText;
    removeButton.textContent = "Remove";
    removeButton.onclick = function() {
        taskList.removeChild(taskItem);
    };

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(removeButton);
    return taskItem;
}

// Function to handle adding a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        // If the input is empty, show an alert message
        alert("Please enter a task before adding!");
    } else {
        // Create the new task item and add it to the list
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = "";
    }
}

// Event listener for the "Add" button
addButton.addEventListener("click", addTask);

// Event listener for the Enter key in the input field
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});