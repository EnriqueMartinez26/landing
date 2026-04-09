import '/src/styles/main.scss';

// Page transition in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');

  // Remueve las clases de transición una vez que termina (0.35s + buffer)
  // para evitar que el 'transform' rompa el 'position: fixed' del modal.
  setTimeout(() => {
    document.body.classList.remove('page-enter', 'page-ready');
  }, 400);

  initProjectShowcase();
  initRevealObserver();
  initAboutModal();
  initMobileMenu();
});

function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const navActions = document.getElementById('siteNavActions');
  const navLinks = navActions?.querySelectorAll('a');

  if (!burgerBtn || !navActions) return;

  const toggleMenu = () => {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', !isExpanded);
    burgerBtn.classList.toggle('is-active');
    navActions.classList.toggle('is-active');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking a link
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (navActions.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navActions.classList.contains('is-active') && !navActions.contains(e.target) && e.target !== burgerBtn) {
      toggleMenu();
    }
  });
}

// Smooth scroll for hash links (exclude modal trigger)
const hashLinks = document.querySelectorAll('a[href^="#"]:not(#aboutModalTrigger)');
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

function initAboutModal() {
  const modal = document.getElementById('aboutModal');
  const trigger = document.getElementById('aboutModalTrigger');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  let scrollPosition = 0;

  if (!modal || !trigger) return;

  // Open modal
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    scrollPosition = window.scrollY;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  // Close modal functions
  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    // No scrollear al cerrar si el usuario hizo clic en un link interno
  };

  // Close on button click
  closeBtn?.addEventListener('click', closeModal);

  // Close on CTA click
  modalCtaBtn?.addEventListener('click', () => {
    closeModal();
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  };
  document.addEventListener('keydown', handleEscapeKey);
}

function initProjectShowcase() {
  const projects = [
    {
      client: 'Cliente legal',
      title: 'Estudio Jurídico',
      image: '/projects/estudio-juridico.png',
      description:
        'Sitio institucional optimizado para captar consultas, reforzar credibilidad y mejorar la experiencia mobile.',
      cta: 'Ver proyecto en vivo',
      url: 'https://estudio-juridico-martinez-carabajal.netlify.app/',
    },
    {
      client: 'Tienda gaming',
      title: '4Fun Store',
      image: '/projects/tienda-4fun.png',
      description:
        'Tienda online de videojuegos con catálogo de productos, compras seguras y una experiencia de usuario optimizada.',
      cta: 'Ver tienda online',
      url: 'https://4funstore-vercel.vercel.app/',
    },
    {
      client: 'Servicios',
      title: 'Turnero "Shifty"',
      icon: '📅',
      color: '#1a1a1a',
      description:
        'Sistema de gestión de turnos inteligente para optimizar la atención al cliente y reducir esperas (Próximamente).',
      cta: 'Consultar disponibilidad',
      url: 'https://wa.me/3816094007?text=Hola Enrique! Me interesa saber más sobre el Turnero Shifty que figura en la web. ¿Cuándo lo lanzan?',
    },
  ];

  const projectHTML = projects
    .map(
      (project) => `
        <article class="proyecto-card reveal-on-scroll">
          <div class="proyecto-thumbnail" ${project.color ? `style="background: ${project.color}"` : ''}>
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="proyecto-img-screenshot">` : `<span class="proyecto-icon">${project.icon}</span>`}
          </div>
          <div class="proyecto-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a class="proyecto-link" href="${project.url}" target="_blank" rel="noreferrer">
              ${project.cta} <span aria-hidden="true">-></span>
            </a>
          </div>
        </article>
      `
    )
    .join('');

  // Populate main grid
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projectHTML;
  }
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
