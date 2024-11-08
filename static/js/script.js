
 // Dark Mode Toggle Logic
 function toggleDarkMode() {
    const root = document.documentElement;
    const currentMode = root.classList.toggle('dark');
    localStorage.setItem('theme', currentMode ? 'dark' : 'light');
    updateDarkModeIcon(currentMode);
}

function updateDarkModeIcon(isDarkMode) {
    const main = document.querySelector('.main-content')
    const darkModeIcon = document.getElementById('dark-mode-icon');
    content.classList.toggle('dark')
    darkModeIcon.innerHTML = isDarkMode
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364-7.364l-.707.707M6.343 6.343l-.707.707M17.657 17.657l-.707-.707M6.343 17.657l-.707-.707" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a8.001 8.001 0 000 15.292A7 7 0 1112 4.354z" /></svg>';
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.classList.add('dark');
        updateDarkModeIcon(true);
    } else {
        root.classList.remove('dark');
        updateDarkModeIcon(false);
    }
});

// Carousel logic
function setupCarousel(sliderId, prevBtnId, nextBtnId) {
    const slider = document.getElementById(sliderId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const itemsPerPage = 6; // Show 6 items at a time
    let currentPage = 0;
    const totalItems = slider.children.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function updateCarousel() {
        slider.style.transform = `translateX(-${currentPage * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentPage = (currentPage + 1) % totalPages;
        updateCarousel();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('projects-slider', 'prev-projects', 'next-projects');
    setupCarousel('certificates-slider', 'prev-certificates', 'next-certificates');

    // Tab toggle logic (for switching between Projects and Certificates)
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabContents.forEach(content => content.classList.add('hidden'));
            tabs.forEach(item => {
                item.setAttribute('aria-selected', 'false');
                item.classList.remove('border-blue-500');
                item.classList.add('border-transparent');
            });
            const target = document.querySelector(tab.getAttribute('data-target'));
            target.classList.remove('hidden');
            tab.setAttribute('aria-selected', 'true');
            tab.classList.add('border-blue-500');
        });
    });
});
