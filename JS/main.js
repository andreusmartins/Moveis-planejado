document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // EFEITO DE SCROLL NA NAVBAR
    // =============================================
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Debounce para melhor performance
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    window.addEventListener('scroll', debounce(handleScroll, 10));

    // =============================================
    // SCROLL SUAVE PARA LINKS ÂNCORA
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fechar navbar mobile se estiver aberta
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    // =============================================
    // BOTÃO "VOLTAR AO TOPO"
    // =============================================
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =============================================
    // INICIALIZAÇÃO DE TOOLTIPS
    // =============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // =============================================
    // FOCO NO MODAL QUANDO ABERTO
    // =============================================
    const budgetModal = document.getElementById('budgetModal');
    if (budgetModal) {
        budgetModal.addEventListener('shown.bs.modal', () => {
            const firstInput = budgetModal.querySelector('input');
            if (firstInput) firstInput.focus();
        });
    }
});
