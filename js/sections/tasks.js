let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

export function initTasksSection() {
  const content = document.querySelector(".content");
  const form = content.querySelector(".task-form");
  const input = content.querySelector(".task-input");
  const list = content.querySelector(".task-list");
  const filterButtons = content.querySelectorAll(".filter-btn");
  const clearBtn = content.querySelector(".clear-all-btn");

  if (!form || !input || !list) return;

  renderTasks(list);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const newTask = {
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(list);
    input.value = "";
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks(list);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Удалить все задачи?")) {
        tasks = [];
        localStorage.removeItem("tasks");
        renderTasks(list);
      }
    });
  }

  function renderTasks(list) {
    list.innerHTML = "";
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    });

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = task.completed;

      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.completed) span.classList.add("completed");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.classList.add("delete-btn");

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        span.classList.toggle("completed", task.completed);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });

      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(list);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }
}