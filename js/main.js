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