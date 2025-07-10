// Load existing tasks from localStorage
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => showTask(task));
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  // Save to localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTask(taskText);
  taskInput.value = "";
}

function showTask(taskText) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerText = taskText;
  taskList.appendChild(li);
}
