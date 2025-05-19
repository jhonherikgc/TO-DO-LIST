const toggle = document.getElementById('toggle-theme');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(theme);
  toggle.checked = theme === 'light';
});
