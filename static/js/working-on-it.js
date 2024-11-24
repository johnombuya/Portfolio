/**
 * Callback function to reveal observed sections when they intersect the viewport.
 * @param {IntersectionObserverEntry[]} entries - Array of observed elements and their states.
 * @param {IntersectionObserver} observer - The IntersectionObserver instance observing the elements.
 */
function revealSection(entries, observer) {
    entries.forEach((entry) => {
        // If the section is not intersecting, do nothing
        if (!entry.isIntersecting) return;

        // Make the section visible by removing the 'hidden' class
        entry.target.classList.remove('hidden');

        // Stop observing the current section as it has been revealed
        observer.unobserve(entry.target);
    });
}

// Select all sections to be observed
const allSections = document.querySelectorAll('.section');

// Check if IntersectionObserver is supported by the browser
if ('IntersectionObserver' in window) {
    // Create an IntersectionObserver instance with the revealSection callback
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // Use the viewport as the root
        threshold: 0.15, // Trigger when 15% of the section is visible
    });

    // Observe each section and initially hide it by adding the 'hidden' class
    allSections.forEach((section) => {
        sectionObserver.observe(section);
        section.classList.add('hidden'); // Add hidden class for initial state
    });
} else {
    console.warn('IntersectionObserver is not supported by this browser.');

    // Fallback: Make all sections visible immediately
    allSections.forEach((section) => section.classList.remove('hidden'));
}

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
