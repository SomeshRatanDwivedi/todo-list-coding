let taskElement = JSON.parse(localStorage.getItem("todos")) || [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("todoText");
const taskCounter = document.getElementById("taskCounter");
const button = document.getElementById("saveData");


function addTaskToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `
  <div class='input-parent'>
	    <input type="checkbox" id="${task.id}" ${task.completed ? "checked" : ""} class="custom-checkbox">
      <label class="label" style='text-decoration:${task.completed ? "line-through" : "none"}' for="${task.id}">${task.title}</lable>
  </div>
	<span class="delete"><i data-id="${task.id}" id="delete-icon" class="fa-regular fa-circle-xmark"></i></span>
`;
  taskList.append(li);
}

function renderList() {
  taskList.innerHTML = "";
  taskElement = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(taskElement);
  for (let i = 0; i < taskElement.length; i++) {
    addTaskToDom(taskElement[i]);
  }
  taskCounter.innerHTML = taskElement.length;
}

//-- mark the task in the done status

function markTaskAsComplete(taskId) {
  const Tasks = taskElement.filter(function (task) {
    return task.id === Number(taskId);
  });
  if (Tasks.length > 0) {
    const currentTask = Tasks[0];
    currentTask.completed = !currentTask.completed;
    localStorage.setItem("todos", JSON.stringify(taskElement));
    renderList();
    showNotification("Task Toggled Successfully");
    return;
  }
  showNotification("could not toggle the task");
}


//-- deleting the task

function deleteTask(taskId) {
  let newTasks = taskElement.filter(function (task) {
    return task.id !== Number(taskId);
  });
  taskElement = newTasks;
  localStorage.setItem("todos", JSON.stringify(taskElement));
  renderList();
}

//--  used for add  the task in the array

function addTask(task) {
  if (task.title) {
    taskElement.push(task);
    localStorage.setItem("todos", JSON.stringify(taskElement));
    renderList();
    showNotification("Task Added Successfully");
    return;
  }
  showNotification("Task not Added Successfully");
}

// for catch the notification text

function showNotification(text) {
  alert(text);
}

// -- used to fetch the value and handle key event and store the task in object

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    if (!text) {
      showNotification("you can not add the empty text in the list");
      return;
    }
    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };
    e.target.value = "";
    addTask(task);
    console.log("taskItem", task);
  }
}

// used to handle click event like addtask/delete/checkbox.
function handleClickListener(e) {
  let element = e.target;
  if (element.id === "delete-icon") {
    const taskId = element.dataset.id;
    deleteTask(taskId);
    return;
  } else if (element.className === "custom-checkbox") {
    const taskId = element.id;
    markTaskAsComplete(taskId);
    return;
  } else if (element.id === "saveData") {
    var text = addTaskInput.value;
    const task2 = {
      title: text,
      id: Date.now(),
      completed: false,
    };
    addTaskInput.value = "";
    addTask(task2);
  }
}

function initializeApp() {
  renderList();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleClickListener);

}

initializeApp();
