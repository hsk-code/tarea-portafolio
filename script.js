// Funcionalidad JavaScript para el portafolio principal

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const checkBox = document.getElementById('check');
    
    // Cerrar menú al hacer clic en un enlace (para móvil)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                checkBox.checked = false;
            }
        });
    });
    
    // Manejo del dropdown en móvil
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && window.innerWidth <= 768) {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // Animación de barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Función para verificar si un elemento está visible en la ventana
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animar las barras de habilidades cuando son visibles
    function animateSkillBars() {
        skillLevels.forEach(level => {
            if (isElementInViewport(level) && !level.classList.contains('animated')) {
                level.classList.add('animated');
                level.style.width = level.style.width || level.getAttribute('data-level') || '0%';
            }
        });
    }
    
    // Verificar visibilidad al cargar y al hacer scroll
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('resize', animateSkillBars);
    animateSkillBars(); // Ejecutar una vez al cargar
    
    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // No aplicar para enlaces dropdown o href="#" solo
            if (href === '#' || this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px de compensación para el header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto (simulación)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío de formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular respuesta después de 2 segundos
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Te responderé a la brevedad posible.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Cambio de color del header al hacer scroll
    const header = document.querySelector('header');
    function updateHeaderBackground() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground(); // Ejecutar una vez al cargar
});