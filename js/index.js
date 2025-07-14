document.addEventListener("DOMContentLoaded", () => {
    // Form submission
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (form && submitBtn) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';

            const formData = new FormData(form);

            try {
                const response = await fetch("https://formcarry.com/s/MJUI9Pc8xLP", {
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
                    submitBtn.innerText = "Error al enviar";
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = "Registrarme Ahora";
                    }, 3000);
                }
            } catch (error) {
                submitBtn.innerText = "Error de red";
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Registrarme Ahora";
                }, 3000);
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            modal.classList.add('hidden');
        });
    }

    // FAQ accordion
    document.querySelectorAll('[aria-expanded]').forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.classList.contains('group-aria-expanded') ||
                button.getAttribute('aria-expanded') === 'true';
            const content = button.nextElementSibling;

            if (isExpanded) {
                button.classList.remove('group-aria-expanded');
                button.setAttribute('aria-expanded', 'false');
                content.classList.add('hidden');
            } else {
                button.classList.add('group-aria-expanded');
                button.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Swiper carrusel
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
});



