'use-strict';

/* ----------------------------------------------------------- */
/*  INSERTING PROMISE DIV
  /* ----------------------------------------------------------- */

header = document.querySelector('.second_sec');

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
    'Promise to be amazed? <button class="btn btn--close-cookie btn-success" style="border-radius: 10rem; cursor: pointer; transition: all 0.3s;">Promise</button>';

header.prepend(message); // Appends it as there is only one DOM element -  Adds in header as a child (Last element in header)

// Deleting elements
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        message.remove();
    });

// Styles
// These are set as inline styles
message.style.backgroundColor = 'black'; // Setting background color
message.style.width = '100%';
message.style.color = 'white';
message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

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

//----------------------------------------------------------------------------//

/* ----------------------------------------------------------- */
/*  BACK TO TOP BUTTON
  /* ----------------------------------------------------------- */

//Get the button
let mybutton = document.getElementById('btn-back-to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = 'block';
    } else {
        mybutton.style.display = 'none';
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', backToTop);

function backToTop() {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
    });
}
