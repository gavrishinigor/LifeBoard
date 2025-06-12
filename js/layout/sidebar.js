document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const content = document.querySelector(".content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Снимаем активный класс со всех
      navItems.forEach(el => el.classList.remove("active"));
      // Добавляем активный класс на текущий
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
      <ul class="task-list"></ul>
    </section>
  `;
} else {
  content.innerHTML = `<h1>Раздел: ${section}</h1>`;
}
    });
  });
});