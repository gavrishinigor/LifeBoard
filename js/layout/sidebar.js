import { initTasksSection } from "../sections/tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const content = document.querySelector(".content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Снимаем активный класс со всех
      navItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");

      // Обновляем контент 
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
        initTasksSection(); // ⬅️ запуск логики
        } else if (section === "statistics") {
  content.innerHTML = `
    <section class="statistics-section">
      <h1>Статистика задач</h1>
      <canvas id="statsChart"></canvas>
    </section>
  `;

      } else {
        content.innerHTML = `<h1>Раздел: ${section}</h1>`;
      }


      // ⛔ Закрываем меню на мобильных
      const sidebar = document.querySelector(".sidebar");
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});