'use-strict';

/* ----------------------------------------------------------- */
/*  AGE
  /* ----------------------------------------------------------- */

age = new Date().getFullYear() - 2002;
document.querySelector('.age').textContent = age;

/* ----------------------------------------------------------- */
/*  SCROLL TO SKILLS
  /* ----------------------------------------------------------- */

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section3 = document.querySelector('.third_sec');

btnScrollTo.addEventListener('click', function (e) {
    // First we need to get the coordinates
    const s3coords = section3.getBoundingClientRect();
    // console.log(s3coords); // Logs the coordinates

    window.scrollTo({
        left: s3coords.left + window.pageXOffset,
        top: s3coords.top + window.pageYOffset,
        behavior: 'smooth',
    });

    //   // More modern way to implement this
    //   section3.scrollIntoView({ behavior: 'smooth' });
});
