const API_BASE = "http://localhost:5000";

window.onload = () => {
  loadTasks();
};

async function loadTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  const tasks = await res.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task.text;

    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}
