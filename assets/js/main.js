const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.design-card');
const filterLinks = document.querySelectorAll('[data-filter-link]');

function setFilter(category) {
  filters.forEach(button => button.classList.toggle('active', button.dataset.filter === category));
  cards.forEach(card => {
    const show = category === 'todos' || card.dataset.category === category;
    card.classList.toggle('hidden', !show);
  });
}

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

filters.forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

filterLinks.forEach(link => {
  link.addEventListener('click', () => setFilter(link.dataset.filterLink));
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
