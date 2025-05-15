document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // EFEITO DE SCROLL NA NAVBAR
    // =============================================
    const navbar = document.querySelector('.navbar');
    
    // Adiciona ou remove a classe 'scrolled' dependendo da posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =============================================
    // SCROLL SUAVE PARA LINKS ANCORA
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcula a posição considerando a altura da navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Animação de scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
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
    
    // Mostra ou esconde o botão conforme a posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Animação de scroll ao topo ao clicar no botão
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =============================================
    // FORMULÁRIO DE CONTATO - FORMSUBMIT
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Adiciona feedback visual durante o envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simula um atraso para demonstração (pode remover em produção)
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
            
            // O FormSubmit.co cuidará do envio real do formulário
            console.log('Formulário de contato enviado:', {
                nome: this.nome.value,
                email: this.email.value,
                assunto: this.assunto.value,
                mensagem: this.mensagem.value
            });
        });
    }

    // =============================================
    // FORMULÁRIO DE ORÇAMENTO - FORMSUBMIT
    // =============================================
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            // Adiciona feedback visual durante o envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simula um atraso para demonstração (pode remover em produção)
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Fecha o modal após o envio (o redirecionamento será feito pelo FormSubmit)
                const modal = bootstrap.Modal.getInstance(document.getElementById('budgetModal'));
                modal.hide();
            }, 2000);
            
            // O FormSubmit.co cuidará do envio real do formulário
            console.log('Formulário de orçamento enviado:', {
                nome: this.nome.value,
                email: this.email.value,
                telefone: this.telefone.value,
                projeto: this.projeto.value
            });
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


    // =============================================
//     Observações Importantes:
// Substituições necessárias:

// Substitua teste@teste.com.br pelo seu e-mail real nos formulários

// Atualize https://seusite.com pelo seu domínio real nos campos _next

// Páginas de redirecionamento:

// Crie as páginas obrigado.html e orcamento-enviado.html conforme mostrado anteriormente

// Personalização:

// Você pode adicionar mais campos aos formulários conforme necessário

// Para estilizar os spinners de carregamento, adicione ao seu CSS:

// css
// .fa-spinner {
//     animation: fa-spin 1s infinite linear;
// }
// @keyframes fa-spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(359deg); }
// }
// Esta implementação mantém toda a funcionalidade original do seu site, mas agora com um sistema de envio de formulários totalmente funcional usando FormSubmit.co, com feedback visual para o usuário durante o envio.
    // =============================================