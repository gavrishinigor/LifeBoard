document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (!menuButton || !sidebar) return;

  // Открытие/закрытие сайдбара
  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Закрытие при клике вне сайдбара
  document.addEventListener("click", (e) => {
    const isClickInside = sidebar.contains(e.target) || menuButton.contains(e.target);
    if (!isClickInside) {
      sidebar.classList.remove("open");
    }
  });
});