function addTaskToDOM(task) {
  const taskContainer = document.getElementById("taskContainer");

  const outerDiv = document.createElement("div");
  outerDiv.className =
    "bg-blue-500 p-5 mt-5 rounded flex items-center justify-between";
  outerDiv.setAttribute("data-id", task._id);

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex items-center";

  const span = document.createElement("span");
  span.className = "text-white ml-3";
  span.textContent = task.taskName;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed || false;

  
  if (task.completed) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  checkbox.addEventListener("change", async () => {
    const completed = checkbox.checked;

    span.style.textDecoration = completed ? "line-through" : "none";
    span.style.opacity = completed ? "0.6" : "1";

    try {
      await fetch(`/dashboard/updateTask/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
    } catch (err) {
      console.error("Error updating completion status:", err);
    }
  });

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  const rightDiv = document.createElement("div");
  rightDiv.className = "flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className =
    "text-white hover:bg-yellow-400 transition ease duration-150 hover:rounded px-1 cursor-pointer";
  editBtn.innerHTML = `<i class="bi bi-pen-fill"></i>`;

  const modal = document.getElementById("editModal");
  const closeBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelModal");

  editBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  [closeBtn, cancelBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className =
    "text-white hover:bg-red-400 transition ease duration-150 hover:rounded px-1 cursor-pointer";
  deleteBtn.innerHTML = `<i class="bi bi-trash2-fill"></i>`;

  deleteBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/dashboard/deleteTask/${task._id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok) {
        outerDiv.remove();
      } else {
        alert(result.message || "Failed to delete task.");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  });

  rightDiv.appendChild(editBtn);
  rightDiv.appendChild(deleteBtn);

  outerDiv.appendChild(leftDiv);
  outerDiv.appendChild(rightDiv);

  taskContainer.appendChild(outerDiv);

  const editModalForm = document.getElementById("editForm");
  if (editModalForm) {
    editModalForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newTask = document.getElementById("taskUpdateInput").value;

      const response = await fetch(`/dashboard/updateTask/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: newTask }),
      });

      const result = await response.json();

      if (response.ok) {
        const existingTask = document.querySelector(
          `[data-id='${task._id}'] span`
        );
        if (existingTask) {
          existingTask.textContent = newTask;
        }
        modal.classList.remove("flex");
        modal.classList.add("hidden");
      } else {
        console.error("Error:", result.message);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const taskForm = document.getElementById("taskForm");

  try {
    const response = await fetch("/dashboard/getTask");
    const tasks = await response.json();

    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }

  if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const task = document.getElementById("taskInput").value;

      const response = await fetch("/dashboard/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: task }),
      });

      const result = await response.json();

      if (response.ok) {
        addTaskToDOM(result);
        document.getElementById("taskInput").value;
      } else {
        console.error("Error:", result.message);
      }
    });
  }
});
