// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
scrollToTopBtn.className =
    'fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-lg opacity-0 invisible transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

// Smooth scroll to top
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to sections
document.querySelectorAll('section').forEach((section) => {
    section.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    observer.observe(section);
});

// Add animation classes to elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    element.classList.add('opacity-0', 'transition-all', 'duration-500');
    observer.observe(element);
});

// Add ARIA labels to navigation
document.querySelectorAll('nav a').forEach((link) => {
    if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', link.textContent.trim());
    }
});

// Add focus styles to interactive elements
document.querySelectorAll('a, button').forEach((element) => {
    element.classList.add(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-gray-400',
        'dark:focus:ring-gray-600'
    );
});
