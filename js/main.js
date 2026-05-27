// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
  updateActiveLink();
});

// ── Mobile menu toggle ──
function toggleMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.classList.toggle('active');
  links.classList.toggle('active');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('navToggle').classList.remove('active');
  });
});

// ── Active nav link ──
function updateActiveLink() {
  const sections = ['sobre', 'mvv', 'servicos', 'contato'];
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated counters ──
const counters = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.target == '98' ? '+' : '+';
      let current = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ── Form submit feedback ──
document.querySelector('.contact-form')?.addEventListener('submit', function() {
  const btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.textContent = '⏳ Enviando...';
});
