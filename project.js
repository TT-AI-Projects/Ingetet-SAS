document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVEGACIÓN SPA (por secciones/páginas)
    // ==========================================
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-links a[data-page]');
    const pageButtons = document.querySelectorAll('[data-page]');

    const showPage = (pageId) => {
        // Ocultar todas las páginas
        pages.forEach(page => page.classList.remove('active'));
        
        // Mostrar la página seleccionada
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Actualizar menú activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Cerrar menú móvil si está abierto
        if (window.innerWidth <= 900) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('active');
        }
    };

    // Eventos de navegación - Sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Eventos de navegación - Botones dentro del contenido
    pageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = btn.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // ==========================================
    // 2. MODO OSCURO
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('ingetet-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('ingetet-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // ==========================================
    // 3. ANIMACIONES DE ENTRADA (REVEAL)
    // ==========================================
    const observeRevealElements = () => {
        const revealElements = document.querySelectorAll('.page.active .dashboard-card, .page.active .quick-card, .page.active .service-card, .page.active .contact-item');
        
        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.classList.add(`reveal-delay-${(index % 4) + 1}`);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    };

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    observeRevealElements();
    
    // Mostrar página inicial
    showPage('inicio');
});