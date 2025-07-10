// Form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate form submission (in a real scenario, you would send to server)
    setTimeout(function () {
        document.getElementById('success-modal').classList.remove('hidden');
    }, 1000);
});

// Close modal
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('success-modal').classList.add('hidden');
});

// FAQ accordion functionality
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

// Smooth scrolling for anchor links
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

//  Button 

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function () {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';
});