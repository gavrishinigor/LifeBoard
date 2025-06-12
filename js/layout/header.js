document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});