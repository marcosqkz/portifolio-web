document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------
       Formulário de contato
       (usa FormSubmit — o próprio HTML já envia o
       email sozinho, não precisa de JavaScript aqui)
    ----------------------------------------- */
    try {
        var menuButton = document.getElementById('mobile-menu-button');
        var navLinks = document.getElementById('mobile-menu');

        if (menuButton && navLinks) {
            menuButton.addEventListener('click', function () {
                var isOpen = navLinks.classList.toggle('active');
                menuButton.setAttribute('aria-expanded', isOpen);
                menuButton.innerHTML = isOpen
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>';
            });

            navLinks.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    navLinks.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    } catch (err) {
        console.error('Erro no menu mobile:', err);
    }

    /* -----------------------------------------
       Scroll suave para âncoras
    ----------------------------------------- */
    try {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (err) {
        console.error('Erro no scroll suave:', err);
    }

    /* -----------------------------------------
       Animação de revelação ao rolar
    ----------------------------------------- */
    try {
        var revealTargets = document.querySelectorAll(
            '.about-grid, .skills-grid, .projects-grid, .contact-grid'
        );

        if ('IntersectionObserver' in window && revealTargets.length) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            revealTargets.forEach(function (el) {
                el.classList.add('reveal-pending');
                observer.observe(el);
            });
        }
    } catch (err) {
        console.error('Erro na animação de scroll:', err);
    }

    /* -----------------------------------------
       Botão "voltar ao topo"
    ----------------------------------------- */
    try {
        var backToTop = document.getElementById('back-to-top');

        if (backToTop) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 400) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (err) {
        console.error('Erro no botão voltar ao topo:', err);
    }

    /* -----------------------------------------
       Modal de detalhes do projeto
    ----------------------------------------- */
    try {
        var modal = document.getElementById('project-modal');
        var modalImg = document.getElementById('modal-img');
        var modalTitle = document.getElementById('modal-title');
        var modalDesc = document.getElementById('modal-desc');
        var modalTag = document.getElementById('modal-tag');

        var openProjectModal = function (card) {
            var img = card.getAttribute('data-img');
            var title = card.getAttribute('data-title');
            var desc = card.getAttribute('data-desc');
            var tag = card.getAttribute('data-tag');

            modalImg.src = img || '';
            modalImg.alt = title || '';
            modalTitle.textContent = title || '';
            modalDesc.textContent = desc || '';
            modalTag.textContent = tag || '';

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        var closeProjectModal = function () {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (modal && modalImg && modalTitle && modalDesc && modalTag) {
            document.querySelectorAll('[data-open-project]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var card = button.closest('.project-card');
                    if (card) openProjectModal(card);
                });
            });

            document.querySelectorAll('[data-close-project]').forEach(function (el) {
                el.addEventListener('click', closeProjectModal);
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeProjectModal();
                }
            });
        }
    } catch (err) {
        console.error('Erro no modal de projetos:', err);
    }

});
