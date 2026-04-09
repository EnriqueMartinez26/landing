// Page transition in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');
  initProjectShowcase();
  initRevealObserver();
});

// Smooth scroll for hash links
const hashLinks = document.querySelectorAll('a[href^="#"]');
for (const link of hashLinks) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Simple page transition out for internal page links
const internalLinks = document.querySelectorAll('a[data-link]');
for (const link of internalLinks) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;

    event.preventDefault();
    document.body.classList.remove('page-ready');

    window.setTimeout(() => {
      window.location.href = href;
    }, 220);
  });
}

function initProjectShowcase() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  const projects = [
    {
      client: 'Cliente legal',
      title: 'Estudio Jurídico',
      icon: '⚖️',
      color: '#0a192f', // Dark blue like the real site
      description:
        'Sitio institucional optimizado para captar consultas, reforzar credibilidad y mejorar la experiencia mobile.',
      cta: 'Ver proyecto en vivo',
      url: 'https://estudio-juridico-martinez-carabajal.netlify.app/',
    },
    {
      client: 'Comercio local',
      title: 'Landing de servicios',
      icon: '🛍️',
      color: '#1e293b',
      description:
        'Página orientada a conversión con propuesta clara, llamados a la acción estratégicos y tiempos de carga optimizados.',
      cta: 'Solicitar caso similar',
      url: 'https://wa.me/3816094007',
    },
    {
      client: 'Operación comercial',
      title: 'Flujo de contacto',
      icon: '⚡',
      color: '#0f172a',
      description:
        'Automatización de consultas frecuentes para reducir fricción comercial y mejorar la velocidad de respuesta al cliente.',
      cta: 'Consultar implementación',
      url: 'https://wa.me/3816094007',
    },
  ];

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="proyecto-card reveal-on-scroll">
          <div class="proyecto-thumbnail" style="background: ${project.color}">
            <span class="proyecto-icon">${project.icon}</span>
          </div>
          <div class="proyecto-body">
            <h3>${project.title}</h3>
            <a class="proyecto-link" href="${project.url}" target="_blank" rel="noreferrer">
              ${project.cta} <span aria-hidden="true">-></span>
            </a>
          </div>
        </article>
      `
    )
    .join('');
}

function initRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
