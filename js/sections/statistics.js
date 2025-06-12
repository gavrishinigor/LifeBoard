export function initStatisticsSection() {
  const canvas = document.getElementById("statsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const weeklyStats = [0, 0, 0, 0, 0, 0, 0]; // Пн - Вс

  tasks.forEach(task => {
    if (task.completed && task.createdAt) {
      const date = new Date(task.createdAt);
      const day = date.getDay(); // Вск = 0, Пн = 1, ..., Сб = 6
      const mappedIndex = day === 0 ? 6 : day - 1;
      weeklyStats[mappedIndex]++;
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
        y: {
          beginAtZero: true
        }
      }
    }
  });
}