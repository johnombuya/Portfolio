document.addEventListener('DOMContentLoaded', () => {
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
        const darkModeIcon = document.getElementById('dark-mode-icon');
        if (darkModeIcon) {
            darkModeIcon.innerHTML = isDarkMode
                ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364-7.364l-.707.707M6.343 6.343l-.707.707M17.657 17.657l-.707-.707M6.343 17.657l-.707-.707" /></svg>` // Moon icon
                : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a8.001 8.001 0 000 15.292A7 7 0 1112 4.354z" /></svg>`; // Sun icon
        }
    }

    // Add event listener to toggle button for dark mode
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }

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

    /**
     * Handles navigation clicks within the navigation bar to smooth scroll to target sections.
     *
     * @param {Event} e - The click event triggered by the user.
     * @param {string} parentClass - The class name to identify the clickable elements that trigger the scroll.
     */
    function scrollToSection(e, parentClass) {
        // Determine if the clicked element or its parent has the 'parentClass' class
        const target = e.target.closest(`.${parentClass}`);

        console.log('Target: ', target);

        // If a valid target with the specified class is found
        if (target) {
            // Get the href value which corresponds to the target section's ID
            const targetId = target.getAttribute('href');

            if (targetId === '/') return; // Ignore the root URL

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

    /**
     * Callback function to reveal observed sections when they intersect the viewport.
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements.
     * @param {IntersectionObserver} observer - The IntersectionObserver instance.
     */
    function revealSection(entries, observer) {
        const [entry] = entries;

        // If the section is not intersecting, do nothing
        if (!entry.isIntersecting) return;

        // Make the section visible
        entry.target.classList.remove('hidden');

        // Stop observing once revealed
        observer.unobserve(entry.target);
    }

    // // Lazy Loading Images
    // // Select all images on the page to apply lazy loading
    // const allImgs = document.querySelectorAll('img'); // Target images
    // // const allImgs = document.querySelectorAll('img[data-src]'); // Target images with data-src attribute

    // /**
    //  * Callback function for IntersectionObserver that loads images when they are in the viewport.
    //  * @param {Array} entries - Array of observed elements and their states.
    //  * @param {IntersectionObserver} observer - The observer instance observing the elements.
    //  */
    // function loadImage(entries, observer) {
    //     const [entry] = entries; // Destructure to get the first entry

    //     if (!entry.isIntersecting) return; // Exit function if the image is not intersecting

    //     // Replace src with data-src for loading the high-resolution image
    //     // entry.target.src = entry.target.dataset.src;

    //     // Remove blurry filter after image has loaded
    //     entry.target.addEventListener('load', function () {
    //         entry.target.classList.remove('lazy-img');
    //     });

    //     // Stop observing the current image as it has been loaded
    //     observer.unobserve(entry.target);
    // }

    // // Create an IntersectionObserver to observe images for lazy loading
    // const imageObserver = new IntersectionObserver(loadImage, {
    //     root: null, // Use the viewport as the root
    //     threshold: 0.15, // Image will start loading when it is 15% visible
    //     rootMargin: '200px', // Preload images 200px before they come into view
    // });

    // // Apply the observer to each image and add lazy loading class
    // allImgs.forEach((img) => {
    //     imageObserver.observe(img);
    //     img.classList.add('lazy-img');
    // });

    // Reveal sections on scroll using IntersectionObserver
    const allSections = document.querySelectorAll('.section');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null, // Relative to the viewport
            threshold: 0.15, // Trigger when 15% of the section is visible
        });

        // allSections.forEach((section) => {
        //     sectionObserver.observe(section);
        //     section.classList.add('hidden');
        // });
    } else {
        // console.warn('IntersectionObserver is not supported by this browser.');
        allSections.forEach((section) => section.classList.remove('hidden'));
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
