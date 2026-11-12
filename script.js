const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const dialog = document.querySelector('#order-dialog');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Cerrar menu');
  nav.classList.toggle('is-open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-order]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
reveals.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector('#contact-form');
const formNote = contactForm.querySelector('.form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = contactForm.elements.email.value.trim();
  const phone = contactForm.elements.phone.value.trim();
  if (!email && !phone) {
    formNote.textContent = 'Comparte tu email o telefono para que podamos contactarte.';
  } else {
    formNote.textContent = 'Gracias — recibimos tu mensaje y te contactaremos pronto.';
    contactForm.reset();
  }
  formNote.classList.add('is-visible');
  window.setTimeout(() => formNote.classList.remove('is-visible'), 5000);
});
