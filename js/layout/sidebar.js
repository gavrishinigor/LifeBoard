import { initTasksSection } from "../sections/tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const content = document.querySelector(".content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // 1. Активное меню
      navItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");

      // 2. Определение раздела
      const section = item.dataset.section;

      // 3. Обработка задач
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
        initTasksSection(); // ⬅️ Запуск логики задач
      }

      // 4. Обработка статистики
      else if (section === "statistics") {
        content.innerHTML = `
          <section class="statistics-section">
            <h1>Статистика задач</h1>
            <canvas id="statsChart"></canvas>
          </section>
        `;
        // ❗ НЕ ЗАБУДЬ: подключён ли у тебя initStatisticsChart()? Если не вызывается — статистика не появится!
        // Можно добавить import и вызвать здесь, если не подключается автоматически
      }

      // 5. Остальные разделы
      else {
        content.innerHTML = `<h1>Раздел: ${section}</h1>`;
      }

      // 6. Закрытие меню на мобилках
      const sidebar = document.querySelector(".sidebar");
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});