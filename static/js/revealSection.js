/* ----------------------------------------------------------- */
/*  REVEAL SECTIONS ON SCROLL
  /* ----------------------------------------------------------- */
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');

    // Unobserve when section has been shown
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    // Section only revealed when it's 15% visible
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});
