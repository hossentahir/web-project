let editingIndex = null;

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

  showAllTasks();
  taskInput.value = "";
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
}

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index];
  editingIndex = index;

  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline";
}

function updateTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskInput = document.getElementById("taskInput");
  const updatedText = taskInput.value.trim();
  if (updatedText === "") return;

  tasks[editingIndex] = updatedText;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showAllTasks();
  taskInput.value = "";
  editingIndex = null;

  document.getElementById("addBtn").style.display = "inline";
  document.getElementById("updateBtn").style.display = "none";
}

function showAllTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => showTask(task, index));
}

function showTask(taskText, index) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.innerText = taskText;

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.onclick = () => deleteTask(index);

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.style.marginLeft = "5px";
  editBtn.onclick = () => editTask(index);

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}
