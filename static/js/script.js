document.addEventListener('DOMContentLoaded', () => {
    /**
     * Toggle dark mode and save preference to localStorage.
     */
    function toggleDarkMode() {
        const root = document.documentElement;
        const isDarkMode = root.classList.toggle('dark'); // Toggle 'dark' class on the root element
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save preference
        updateDarkModeIcon(isDarkMode);
    }

    /**
     * Update the dark mode icon based on the current theme.
     * @param {boolean} isDarkMode - Indicates if dark mode is active.
     */
    function updateDarkModeIcon(isDarkMode) {
        const darkModeIcons = document.querySelectorAll('.dark-mode-icon'); // Select all dark mode icons
        darkModeIcons.forEach((icon) => {
            icon.innerHTML = isDarkMode
                ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364-7.364l-.707.707M6.343 6.343l-.707.707M17.657 17.657l-.707-.707M6.343 17.657l-.707-.707" /></svg>` // Moon icon
                : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a8.001 8.001 0 000 15.292A7 7 0 1112 4.354z" /></svg>`; // Sun icon
        });
    }

    // Set the initial theme from localStorage or system preference
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode =
        savedTheme === 'dark' ||
        (!savedTheme &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    updateDarkModeIcon(isDarkMode); // Set the initial icon state

    // Add event listeners to all dark mode toggle buttons
    const toggleButtons = document.querySelectorAll('.dark-mode-toggle');
    toggleButtons.forEach((button) => {
        button.addEventListener('click', toggleDarkMode);
    });

    /**
     * Fade-out loader function and display the main content upon completion.
     * @param {number} opacity - The current opacity level to be decreased.
     */
    function loadNow(opacity) {
        // Ensure loader is defined before operating
        if (loader) {
            if (opacity <= 0) {
                displayContent();
            } else {
                loader.style.opacity = opacity;
                window.setTimeout(() => loadNow(opacity - 0.18), 50);
            }
        }
    }

    /**
     * Display the main content and hide the loader.
     */
    function displayContent() {
        if (loader) {
            loader.style.display = 'none';
        }
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
        }
    }

    // Initialize loader
    loader = document.getElementById('loader');
    if (loader) loadNow(1);

    // Lazy Loading Images with Blur Overlay

    /**
     * Lazy load all images on the page.
     * A blur overlay is applied initially and removed when the image is fully loaded.
     */

    // Select all images on the page
    const allImgs = document.querySelectorAll('img.lazy-img');

    /**
     * Callback function for IntersectionObserver.
     * Adds a listener to remove blur overlay once the image is loaded.
     * @param {Array} entries - Array of observed elements and their states.
     * @param {IntersectionObserver} observer - The observer instance observing the elements.
     */
    function handleImageLazyLoad(entries, observer) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return; // Skip if the image is not yet visible in the viewport

            const img = entry.target;

            // Add a listener to remove blur once the image is fully loaded
            img.addEventListener('load', function () {
                img.classList.remove('lazy-img'); // Remove the blur class
            });

            // Stop observing the current image
            observer.unobserve(img);
        });
    }

    // Create an IntersectionObserver to observe images for lazy loading
    const imageObserver = new IntersectionObserver(handleImageLazyLoad, {
        root: null, // Use the viewport as the root
        threshold: 0.15, // Start loading images when they are 15% visible in the viewport
        rootMargin: '200px', // Preload images 200px before they come into view
    });

    // Apply the observer to each image on the page
    allImgs.forEach((img) => {
        imageObserver.observe(img);
    });

    /**
     * Handles navigation clicks within the navigation bar to smooth scroll to target sections.
     *
     * @param {Event} e - The click event triggered by the user.
     * @param {string} parentClass - The class name to identify the clickable elements that trigger the scroll.
     */
    function scrollToSection(e, parentClass) {
        if (e.target.closest('.dark-mode-toggle')) return;

        // Determine if the clicked element or its parent has the 'parentClass' class
        const target = e.target.closest(`.${parentClass}`);

        // If a valid target with the specified class is found
        if (target) {
            // Get the href value which corresponds to the target section's ID
            const targetId = target.getAttribute('href');

            if (
                targetId === '/' ||
                targetId === '/resume' ||
                targetId === '/resume/download'
            )
                return; // Ignore the root, resume and download resume URLs

            e.preventDefault(); // Prevent default anchor behavior (e.g., immediate jump)

            // Ensure the target element exists before scrolling
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to target element
            } else {
                // console.warn(`No element found for ID: ${targetId}`);
            }
        }
    }

    // Event listener for navigation clicks
    const nav = document.querySelector('nav');
    const dropdownMenu = document.querySelector('#dropdown-menu');

    if (nav) {
        nav.addEventListener('click', (e) => scrollToSection(e, 'nav-real'));
    }

    if (dropdownMenu)
        dropdownMenu.addEventListener('click', (e) =>
            scrollToSection(e, 'dropdown-link')
        );

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

    // Scroll the active slide into view after slide change or transition end
    swiper.on('slideChangeTransitionEnd', () => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            activeSlide.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
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
        navbar: true,
        toolbar: true,
        tooltip: true,
        fullscreen: false,
        movable: true,
        zoomable: true,
        scalable: true,
        transition: true,
    });

    // Create function to update years
    function updateYears() {
        // Set current age in about me section
        let ageText = document.querySelector('.age-text');
        if (ageText) {
            ageText.textContent = new Date().getFullYear() - 2002;
        }

        // Set current year in footer section
        let footerYearElement = document.querySelector('.footer-year-text');
        if (footerYearElement)
            footerYearElement.textContent = new Date().getFullYear();
    }

    updateYears();
});
