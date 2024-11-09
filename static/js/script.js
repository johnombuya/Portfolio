// Dark Mode Toggle Logic
function toggleDarkMode() {
    const root = document.documentElement; // Get the root element
    const isDarkMode = root.classList.toggle('dark'); // Toggle 'dark' class on root element
    // Save the current theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateDarkModeIcon(isDarkMode); // Update the icon based on the mode
}

// Update the dark mode icon based on current theme
function updateDarkModeIcon(isDarkMode) {
    const main = document.querySelector('.main-content'); // Get the main content container
    const darkModeIcon = document.getElementById('dark-mode-icon'); // Get the dark mode icon element
    main.classList.toggle('dark'); // Apply dark mode styles to main content
    // Set the appropriate SVG icon based on the mode
    darkModeIcon.innerHTML = isDarkMode
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364-7.364l-.707.707M6.343 6.343l-.707.707M17.657 17.657l-.707-.707M6.343 17.657l-.707-.707" /></svg>' // Moon icon for dark mode
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a8.001 8.001 0 000 15.292A7 7 0 1112 4.354z" /></svg>'; // Sun icon for light mode
}

// On page load, set the theme based on localStorage or system preference
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme'); // Retrieve the saved theme from localStorage
    if (savedTheme === 'dark') {
        root.classList.add('dark'); // Apply dark mode if stored preference is 'dark'
        updateDarkModeIcon(true); // Update the icon for dark mode
    } else {
        root.classList.remove('dark'); // Remove dark mode if the stored preference is not 'dark'
        updateDarkModeIcon(false); // Update the icon for light mode
    }

    // Tab toggle logic (for switching between Projects and Certificates)
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // Hide all tab contents
            tabContents.forEach((content) => content.classList.add('hidden'));

            // Remove the active state from all tabs
            tabs.forEach((item) => {
                item.setAttribute('aria-selected', 'false');
                item.classList.remove('border-blue-500', 'border-b-2'); // Remove both active border classes
                item.classList.add('border-transparent');
            });

            // Show the corresponding tab content
            const target = document.querySelector(
                tab.getAttribute('data-target')
            );
            target.classList.remove('hidden');

            // Set the clicked tab as active
            tab.setAttribute('aria-selected', 'true');
            tab.classList.add('border-blue-500', 'border-b-2'); // Add both border classes to the active tab
        });
    });

    // Swiper Initialization for centered-slide-carousel
    const swiper = new Swiper('.centered-slide-carousel', {
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        slideToClickedSlide: true,
        pagination: {
            el: '.centered-slide-carousel .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1920: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1028: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            990: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
    });
});
