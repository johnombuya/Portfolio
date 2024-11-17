let loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function () {
            loadNow(opacity - 0.18);
        }, 50);
    }
}

function displayContent() {
    loader.style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Function to toggle dark mode and save the preference in localStorage
function toggleDarkMode() {
    const root = document.documentElement;
    const isDarkMode = root.classList.toggle('dark'); // Toggle 'dark' class on the root element
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save the theme preference
    updateDarkModeIcon(isDarkMode); // Update the icon
}

// Function to update the dark mode icon based on the current theme
function updateDarkModeIcon(isDarkMode) {
    const darkModeIcon = document.getElementById('dark-mode-icon');
    darkModeIcon.innerHTML = isDarkMode
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364-7.364l-.707.707M6.343 6.343l-.707.707M17.657 17.657l-.707-.707M6.343 17.657l-.707-.707" /></svg>` // Moon icon for dark mode
        : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a8.001 8.001 0 000 15.292A7 7 0 1112 4.354z" /></svg>`; // Sun icon for light mode
}

/**
 * Handles navigation clicks within the navigation bar to smooth scroll to target sections.
 *
 * @param {Event} e - The click event triggered by the user.
 * @param {string} parentClass - The class name to identify the clickable elements that trigger the scroll.
 */
function scrollToSection(e, parentClass) {
    // Determine if the clicked element or its parent has the 'parentClass' class
    const target = e.target.closest(`.${parentClass}`);

    // If a valid target with the specified class is found
    if (target) {
        e.preventDefault(); // Prevent default anchor behavior (e.g., immediate jump)

        // Get the href value which corresponds to the target section's ID
        const targetId = target.getAttribute('href');

        // Ensure the target element exists before scrolling
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to target element
        } else {
            console.warn(`No element found for ID: ${targetId}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Once the DOM is loaded, hide the loader
    loader = document.getElementById('loader');
    loadNow(1);

    // On page load, set the theme based on localStorage or system preference
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';

    if (isDarkMode) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    updateDarkModeIcon(isDarkMode); // Set the initial icon state

    // Event listener for navigation clicks
    document
        .querySelector('nav')
        .addEventListener('click', (e) => scrollToSection(e, 'nav-real'));

    // Event listener for dropdown menu clicks (fixing class selector to be correct)
    document
        .querySelector('#dropdown-menu')
        .addEventListener('click', (e) => scrollToSection(e, 'dropdown-link'));

    // Add event listener to the toggle button
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.addEventListener('click', toggleDarkMode);

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

    const swiperDrawer = new Swiper('.vertical-slide-carousel', {
        loop: true,
        direction: 'vertical',
        // mousewheel: true, // Removed `mousewheelControl` and kept `mousewheel: true`
        mousewheelControl: true,
        mousewheel: {
            releaseOnEdges: true,
        },
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
            el: '.vertical-slide-carousel .swiper-pagination',
            clickable: true,
        },
    });

    // Create a new instance of Viewer
    const gallery = new Viewer(document.getElementById('certificate_imgs'), {
        // Optional configuration options (refer to the Viewer.js documentation)
        navbar: true,
        toolbar: true,
        tooltip: true,
        fullscreen: false,
        movable: true,
        zoomable: true,
        scalable: true,
        transition: true,
    });

    // Set current age in about me section
    let ageText = document.querySelector('.age-text');
    ageText.textContent = new Date().getFullYear() - 2002;

    // Set current year in footer section
    let footerYearText = document.querySelector('.footer-year-text');
    footerYearText.textContent = new Date().getFullYear();
});
