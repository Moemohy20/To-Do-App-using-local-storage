let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAllTasks = document.querySelector(".delete-all");
// empty array to store the task
let arrayOfTasks = [];
getDataFromLocalStorage();

// Check if Data found
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = ""; // clear input field
  }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
  // Delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove task from page
    e.target.parentElement.remove();
  }
  //   task element
  if (e.target.classList.contains("task")) {
    //   Toggle Completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    //   Toggle Done Class
    e.target.classList.toggle("done");
  }
});

//
function addTaskToArray(taskText) {
  // Task Data
  const task = {
    taskId: Date.now(),
    taskTitle: taskText,
    taskStatus: false,
  };
  arrayOfTasks.push(task);
  // add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // Add task to local sotrage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty task div
  tasksDiv.innerHTML = "";
  // looping on array of task
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check if Task Status
    if (task.taskStatus === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.taskId);
    div.appendChild(document.createTextNode(task.taskTitle));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button to Main Div
    div.appendChild(span);
    // Add task div to task container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  //   for (let i = 0; i < arrayOfTasks.length; i++) {
  //     console.log(`${arrayOfTasks[i].taskId} === ${taskId}`);
  //   }
  arrayOfTasks = arrayOfTasks.filter((task) => task.taskId != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].taskId == taskId) {
      arrayOfTasks[i].taskStatus == false
        ? (arrayOfTasks[i].taskStatus = true)
        : (arrayOfTasks[i].taskStatus = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
