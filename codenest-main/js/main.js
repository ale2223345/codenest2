document.addEventListener('DOMContentLoaded', () => {
  console.log('%cCodeNest Web Platform - Sprint III', 'background: #0F172A; color: #38BDF8; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log('Estructura semántica HTML5 inicializada correctamente.');

  // Actualización automática del año en el Footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Resaltado automático de la página activa en el menú <nav>
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  // Las páginas de detalle de cursos resaltan "Cursos" en el menú
  if (['ux-ui.html', 'git-github.html', 'ciencia-datos.html'].includes(currentPath)) {
    currentPath = 'servicios.html';
  }
  const navLinks = document.querySelectorAll('.main-navigation .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Manejo de cierre suave del menú móvil tras clic
  const navbarCollapse = document.getElementById('navbarCodeNest');
  const navItems = document.querySelectorAll('.main-navigation .nav-link:not(.dropdown-toggle)');
  if (navbarCollapse && window.bootstrap) {
    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Formularios con alertas de Bootstrap (contacto y boletín)
  function mostrarAlerta(contenedor, tipo, icono, mensaje) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show d-flex align-items-center`;
    alerta.setAttribute('role', 'alert');
  
    const i = document.createElement('i');
    i.className = `bi ${icono} me-2 flex-shrink-0`;
    const texto = document.createElement('div');
    texto.textContent = mensaje;
    const cerrar = document.createElement('button');
    cerrar.type = 'button';
    cerrar.className = 'btn-close';
    cerrar.setAttribute('data-bs-dismiss', 'alert');
    cerrar.setAttribute('aria-label', 'Cerrar');
  
    alerta.append(i, texto, cerrar);
    contenedor.appendChild(alerta);
  }
  
  document.querySelectorAll('form[data-cn-form]').forEach(form => {
    const contenedor = document.querySelector(form.dataset.alertTarget);
    form.addEventListener('submit', evento => {
      evento.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        mostrarAlerta(contenedor, 'danger', 'bi-exclamation-triangle-fill', form.dataset.errorMsg);
        return;
      }
      mostrarAlerta(contenedor, 'success', 'bi-check-circle-fill', form.dataset.successMsg);
      form.reset();
      form.classList.remove('was-validated');
    });
  });

  // Preselecciona el curso en el formulario de contacto (?curso=ux-ui)
  const selectCurso = document.getElementById('curso');
  const cursoParam = new URLSearchParams(window.location.search).get('curso');
  if (selectCurso && cursoParam) {
    selectCurso.value = cursoParam;
  }
});
