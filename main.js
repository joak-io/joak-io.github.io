/* =============================================
   main.js  —  Portfolio interactivity
   ============================================= */

// ─── 1. AÑO ACTUAL EN EL FOOTER ────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


// ─── 2. MENÚ HAMBURGUESA (móvil) ───────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cierra el menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ─── 3. EFECTO DE ESCRITURA EN EL HERO ─────────────────────
const roles  = ['Front-end', 'Back-end', 'Full Stack'];
let   rIndex = 0, cIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function type() {
  const current = roles[rIndex];

  typedEl.textContent = deleting
    ? current.slice(0, cIndex--)
    : current.slice(0, cIndex++);

  let delay = deleting ? 60 : 110;

  if (!deleting && cIndex > current.length) {
    delay   = 1800;            // pausa antes de borrar
    deleting = true;
  } else if (deleting && cIndex < 0) {
    deleting = false;
    rIndex   = (rIndex + 1) % roles.length;
    delay    = 400;
  }

  setTimeout(type, delay);
}
type();


// ─── 4. CONTADORES ANIMADOS ("Sobre mí") ───────────────────
function animateCount(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1200;                 // ms
  const step     = duration / target;
  let   count    = 0;

  const timer = setInterval(() => {
    count++;
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, step);
}

// Dispara cuando la sección entra en el viewport
const statNumbers = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(n => countObserver.observe(n));


// ─── 5. BARRAS DE HABILIDAD ────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ─── 6. FORMULARIO DE CONTACTO ─────────────────────────────
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();

  const nombre  = form.nombre.value.trim();
  const email   = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  // Validación básica
  if (!nombre || !email || !mensaje) {
    showStatus('Por favor rellena todos los campos.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('Introduce un email válido.', 'error');
    return;
  }

  // Aquí conectarías con tu backend o servicio (EmailJS, Formspree, etc.)
  // Por ahora simula envío exitoso:
  showStatus('¡Mensaje enviado! Me pondré en contacto pronto.', 'success');
  form.reset();
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.style.color = type === 'error' ? '#f87171' : 'var(--accent)';
  setTimeout(() => { formStatus.textContent = ''; }, 5000);
}


// ─── 7. SCROLL SUAVE PARA LA NAVBAR ACTIVA ─────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : 'var(--text-muted)';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));
