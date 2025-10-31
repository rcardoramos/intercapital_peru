document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const iconMenu = document.getElementById('iconMenu');
    const iconHamburger = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
    const iconClose = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;

    if (menuToggle && mobileMenu && iconMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            if (mobileMenu.classList.contains('hidden')) {
                iconMenu.innerHTML = iconHamburger;
            } else {
                iconMenu.innerHTML = iconClose;
            }
        });

        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    iconMenu.innerHTML = iconHamburger;
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    iconMenu.innerHTML = iconHamburger;
                }
            }
        });
    }

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (form && submitBtn && modal && closeModalBtn) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';

            const formData = new FormData(form);

            try {
                const response = await fetch("https://getform.io/f/agdjyjrb", {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: formData,
                });

                if (response.ok) {
                    modal.classList.remove('hidden');
                    form.reset();
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = 'Registrarme Ahora';
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    console.error('Error al enviar formulario:', errorData);
                    submitBtn.innerText = "Error al enviar";
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = "Registrarme Ahora";
                    }, 3000);
                }
            } catch (error) {
                console.error('Error de red o fetch:', error);
                submitBtn.innerText = "Error de red";
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Registrarme Ahora";
                }, 3000);
            }
        });

        closeModalBtn.addEventListener('click', function () {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }


    document.querySelectorAll('.accordion-button[aria-expanded]').forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const content = button.nextElementSibling;

            document.querySelectorAll('.accordion-button[aria-expanded="true"]').forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherButton.nextElementSibling.classList.add('hidden');
                }
            });

            if (isExpanded) {
                button.setAttribute('aria-expanded', 'false');
                content.classList.add('hidden');

            } else {
                button.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');

            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento de salto predeterminado
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                if (!mobileMenu.classList.contains('hidden') && targetId.startsWith('#')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    iconMenu.innerHTML = iconHamburger;
                }
            }
        });
    });

    if (typeof Swiper !== 'undefined') {
        new Swiper(".swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    } else {
        console.warn("Swiper library not found. Please ensure Swiper JS is loaded before main.js");
    }
});

document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        // Cierra todos los demás
        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

        // Abre el actual si estaba cerrado
        if (!expanded) {
            btn.setAttribute('aria-expanded', 'true');
            content.classList.remove('hidden');
        }
    });
});