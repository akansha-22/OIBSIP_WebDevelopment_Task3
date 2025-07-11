const taskForm = document.getElementById("taskForm");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title && description) {
    const time = new Date().toLocaleString();
    addPendingTask(title, description, time);
    taskForm.reset();
  }
});

function addPendingTask(title, description, time) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td contenteditable="false">${title}</td>
    <td contenteditable="false">${description}</td>
    <td>${time}</td>
    <td>
      <button class="action-btn edit-btn click-btn" onclick="editTask(this)">Edit</button>
      <button class="action-btn complete-btn click-btn" onclick="completeTask(this)">Complete</button>
      <button class="action-btn delete-btn click-btn" onclick="deleteTask(this)">X</button>
    </td>
  `;

  pendingTasks.appendChild(tr);
}

function editTask(btn) {
  const row = btn.closest("tr");
  const titleCell = row.children[0];
  const descCell = row.children[1];

  if (btn.textContent === "Edit") {
    titleCell.contentEditable = true;
    descCell.contentEditable = true;
    titleCell.focus();
    btn.textContent = "Save";
    btn.classList.remove("edit-btn");
    btn.classList.add("complete-btn");
  } else {
    titleCell.contentEditable = false;
    descCell.contentEditable = false;
    btn.textContent = "Edit";
    btn.classList.add("edit-btn");
    btn.classList.remove("complete-btn");
  }
}

function completeTask(btn) {
  const row = btn.closest("tr");
  const title = row.children[0].textContent;
  const description = row.children[1].textContent;
  const time = new Date().toLocaleString();

  row.remove();
  addCompletedTask(title, description, time);
}

function addCompletedTask(title, description, time) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${title}</td>
    <td>${description}</td>
    <td>${time}</td>
    <td><button class="action-btn delete-btn click-btn" onclick="deleteTask(this)">X</button></td>
  `;

  completedTasks.appendChild(tr);
}

function deleteTask(btn) {
  const row = btn.closest("tr");
  row.remove();
}
