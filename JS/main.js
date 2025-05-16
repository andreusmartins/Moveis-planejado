document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // EFEITO DE SCROLL NA NAVBAR
    // =============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
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
    // FORMULÁRIO DE CONTATO COM VALIDAÇÃO E ALERTA
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // impede envio tradicional

            // Validação básica via checkValidity
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated'); // para estilos do bootstrap
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Desabilitar botão e mostrar spinner
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;

            // Simula envio async (ex: fetch)
            setTimeout(() => {
                // Resetar botão e formulário
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                contactForm.reset();
                contactForm.classList.remove('was-validated');

                // Criar alerta bootstrap de sucesso
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                successAlert.role = 'alert';
                successAlert.innerHTML = `
                    Formulário enviado com sucesso!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

                // Adicionar alerta antes do formulário
                contactForm.parentNode.insertBefore(successAlert, contactForm);

                // Opcional: remover alerta após 5 segundos
                setTimeout(() => {
                    bootstrap.Alert.getOrCreateInstance(successAlert).close();
                }, 5000);

                // Aqui você pode colocar a lógica real de envio (fetch)
                console.log('Formulário enviado:', {
                    nome: this.nome.value,
                    email: this.email.value,
                    mensagem: this.mensagem.value
                });
            }, 2000);
        });
    }

    // =============================================
    // FORMULÁRIO DE ORÇAMENTO
    // =============================================
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação básica para orçamento (pode ser igual)
            if (!budgetForm.checkValidity()) {
                budgetForm.classList.add('was-validated');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                budgetForm.reset();
                budgetForm.classList.remove('was-validated');

                const modal = bootstrap.Modal.getInstance(document.getElementById('budgetModal'));
                if (modal) modal.hide();

                // Criar alerta bootstrap de sucesso na página (opcional)
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                successAlert.role = 'alert';
                successAlert.innerHTML = `
                    Orçamento enviado com sucesso!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                budgetForm.parentNode.insertBefore(successAlert, budgetForm);

                setTimeout(() => {
                    bootstrap.Alert.getOrCreateInstance(successAlert).close();
                }, 5000);

                console.log('Formulário de orçamento enviado:', {
                    nome: this.nome.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
                    projeto: this.projeto.value
                });
            }, 2000);
        });
    }

    // =============================================
    // BOTÃO DO WHATSAPP (do primeiro código)
    // =============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            console.log('WhatsApp clicado - pode adicionar tracking aqui');
        });
    }

    // =============================================
    // INICIALIZAÇÃO DE TOOLTIPS
    // =============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
