document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Слежение за вставкой формы задач
    const observeTasks = new MutationObserver((mutations, observer) => {    const form = content.querySelector(".task-form");
    const input = content.querySelector(".task-input");
    const list = content.querySelector(".task-list");

    if (!form || !input || !list) return;

    // Отрисовываем задачи
    renderTasks(list);

    // Добавление задачи
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text === "") return;

      const newTask = { text, completed: false };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks(list);
      input.value = "";
    });
    observer.disconnect(); // ❗️Останавливаем наблюдение
  });

  observeTasks.observe(content, { childList: true, subtree: true });

  // 👉 Отдельно, вне observer:
  function renderTasks(list) {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
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
});