/* Age */
if (document.querySelector('.age')) {
    document.querySelector('.age').textContent =
        new Date().getFullYear() - 2002;
}

/* Scroll to Skills */
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section3 = document.querySelector('.third_sec');

btnScrollTo.addEventListener('click', function (e) {
    // First we need to get the coordinates
    const s3coords = section3.getBoundingClientRect();

    window.scrollTo({
        left: s3coords.left + window.pageXOffset,
        top: s3coords.top + window.pageYOffset,
        behavior: 'smooth',
    });

    // More modern way to implement this
    // section3.scrollIntoView({ behavior: 'smooth' });
});
