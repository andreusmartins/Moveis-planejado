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
    // FUNÇÃO GENÉRICA PARA ENVIO DE FORMULÁRIOS
    // =============================================
    function handleFormSubmit(form, successMessage, modal = null) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;

            // Simulação de envio (substituir por fetch real)
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                form.reset();
                form.classList.remove('was-validated');

                // Fechar modal se existir
                if (modal) {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                }

                // Mostrar alerta de sucesso
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
                alertDiv.innerHTML = `
                    ${successMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

                const container = form.closest('.container, .modal-body') || document.body;
                container.insertBefore(alertDiv, form);

                // Remover alerta após 5 segundos
                setTimeout(() => {
                    bootstrap.Alert.getOrCreateInstance(alertDiv).close();
                }, 5000);

                console.log('Formulário enviado:', Object.fromEntries(new FormData(form)));
            }, 1500);
        });
    }

    // =============================================
    // FORMULÁRIO DE CONTATO
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        handleFormSubmit(contactForm, 'Mensagem enviada com sucesso!');
    }

    // =============================================
    // FORMULÁRIO DE ORÇAMENTO
    // =============================================
    const budgetForm = document.getElementById('budgetForm');
    const budgetModal = document.getElementById('budgetModal');
    if (budgetForm) {
        handleFormSubmit(budgetForm, 'Orçamento solicitado com sucesso!', budgetModal);
    }

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
    if (budgetModal) {
        budgetModal.addEventListener('shown.bs.modal', () => {
            budgetModal.querySelector('input').focus();
        });
    }
});