// ================================
// scripts.js
// ================================

// ---- Load header and footer partials ----
['header', 'footer'].forEach(part => {
  fetch(`${part}.html`)
    .then(resp => resp.text())
    .then(html => {
      const placeholder = document.getElementById(`${part}-placeholder`);
      if (placeholder) placeholder.innerHTML = html;
    })
    .then(() => {
      if (part === 'header') initNav();
      if (part === 'footer') initFooterDateTime();
    })
    .catch(err => console.error(`Error loading ${part}.html:`, err));
});

// ================================
// Navigation: Mobile & Dropdown
// ================================
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav ul');
  const navLinks = mainNav?.querySelectorAll('a');
  const parents = document.querySelectorAll('.nav-parent');

  if (!navToggle || !mainNav) return;

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    mainNav.classList.toggle('nav-open');
  });

  // Submenu toggle (mobile and desktop)
  parents.forEach(parent => {
    parent.addEventListener('click', e => {
      const submenu = parent.nextElementSibling;
      if (!submenu) return;

      if (window.innerWidth <= 768) e.preventDefault(); // mobile only

      const expanded = parent.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.submenu.show')
        .forEach(menu => menu.classList.remove('show'));

      parent.setAttribute('aria-expanded', !expanded);
      submenu.classList.toggle('show', !expanded);
    });
  });

  // Close mobile nav when clicking a menu link
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', false);
      mainNav.classList.remove('nav-open');
    });
  });

  // Click outside to close dropdowns
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-parent') &&
        !e.target.closest('.submenu')) {
      document.querySelectorAll('.submenu.show')
        .forEach(menu => menu.classList.remove('show'));
    }
  });
}

// ================================
// Footer Date / Time
// ================================
function initFooterDateTime() {
  const el = document.getElementById('datetime');
  if (!el) return;

  function update() {
    el.textContent = new Date().toLocaleString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  update();
  setInterval(update, 1000);
}

// ================================
// Contact Form Validation
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const errorEl = document.getElementById('formError');
  if (!form || !errorEl) return;

  form.addEventListener('submit', e => {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    let errors = [];

    if (!name.value.trim()) errors.push('Please enter your full name.');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !re.test(email.value)) {
      errors.push('Please enter a valid email address.');
    }

    if (errors.length) {
      e.preventDefault();
      errorEl.textContent = errors.join(' ');
      errorEl.style.display = 'block';
      name.focus();
    }
  });
});
// Dropdown toggle for Planner button
document.querySelectorAll('.nav-item.dropdown .nav-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    btn.parentElement.classList.toggle('show');
  });
});

// Hamburger toggle for mobile
document.querySelectorAll('.hamburger .nav-toggle').forEach(hamburger => {
  hamburger.addEventListener('click', e => {
    const nav = document.getElementById('main-menu');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav-open');
  });
});

// Close dropdown if clicking outside
document.addEventListener('click', e => {
  document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    if (!item.contains(e.target)) item.classList.remove('show');
  });
});
