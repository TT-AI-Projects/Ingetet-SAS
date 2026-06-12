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
            sidebar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }

        // Disparar animaciones de reveal en la nueva página
        setTimeout(() => {
            observeRevealElements();
        }, 100);
    };

    // Eventos de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    pageButtons.forEach(btn => {
        if (!btn.classList.contains('nav-links')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = btn.getAttribute('data-page');
                showPage(pageId);
            });
        }
    });

    // ==========================================
    // 2. MENÚ MÓVIL
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });

    // ==========================================
    // 3. MODO OSCURO
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
    // 4. SCROLL REVEAL (ANIMACIONES DE ENTRADA)
    // ==========================================
    const observeRevealElements = () => {
        const revealElements = document.querySelectorAll('.page.active .dashboard-card, .page.active .quick-card, .page.active .service-card, .page.active .step-card, .page.active .contact-item');
        
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
});