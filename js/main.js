import { initTasksSection } from "./sections/tasks.js";

// Навигация по разделам
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const content = document.querySelector(".content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");

      const section = item.dataset.section;

      if (section === "tasks") {
        content.innerHTML = `
          <section class="tasks-section">
            <h1>Список задач</h1>
            <form class="task-form">
              <input type="text" placeholder="Новая задача" class="task-input" />
              <button type="submit" class="task-add-btn">Добавить</button>
            </form>
            <div class="task-filters">
              <button class="filter-btn" data-filter="all">Все</button>
              <button class="filter-btn" data-filter="active">Активные</button>
              <button class="filter-btn" data-filter="completed">Выполненные</button>
              <button class="clear-all-btn">🧹 Очистить все</button>
            </div>
            <ul class="task-list"></ul>
          </section>
        `;
        initTasksSection();
      }

      else if (section === "statistics") {
        content.innerHTML = `
          <section class="statistics-section">
            <h1>Статистика задач</h1>
            <canvas id="statsChart"></canvas>
          </section>
        `;

        // ⏱ Ждём, пока canvas появится в DOM
        setTimeout(initStatisticsChart, 0);
      }

      else {
        content.innerHTML = `<h1>Раздел: ${section}</h1>`;
      }

      // Закрытие бокового меню на мобилках
      const sidebar = document.querySelector(".sidebar");
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});

// 📊 Статистика — построение графика
function initStatisticsChart() {
  const canvas = document.getElementById("statsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const weeklyStats = [0, 0, 0, 0, 0, 0, 0]; // Пн - Вс

  tasks.forEach(task => {
    if (task.completed && task.createdAt) {
      const date = new Date(task.createdAt);
      const day = date.getDay(); // Вс = 0, Пн = 1, ..., Сб = 6
      const index = day === 0 ? 6 : day - 1;
      weeklyStats[index]++;
    }
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      datasets: [{
        label: "Выполнено задач",
        data: weeklyStats,
        backgroundColor: "#4f46e5"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}