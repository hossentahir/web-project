// Load existing tasks on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => showTask(task, index));
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTask(taskText, tasks.length - 1);
  taskInput.value = "";
}

function showTask(taskText, index) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.innerText = taskText;

  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.style.marginLeft = "10px";
  btn.onclick = function () {
    deleteTask(index);
  };

  li.appendChild(btn);
  taskList.appendChild(li);
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.splice(index, 1); // Remove item from array
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear UI and reload all tasks
  document.getElementById("taskList").innerHTML = "";
  tasks.forEach((task, i) => showTask(task, i));
}
