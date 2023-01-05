'use strict';

/* ----------------------------------------------------------- */
/*  FADE OUT LINKS
  /* ----------------------------------------------------------- */
const handleHover = function (e) {
    if (e.target.classList.contains('nav-link')) {
        const link = e.target;
        const siblings = link.closest('nav').querySelectorAll('nav-link');
        const logo = link.closest('nav').querySelector('img');
        const logoText = document.querySelector('.logo-text');

        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
        logoText.style.opacity = this;
    }
};

document
    .querySelector('nav')
    .addEventListener('mouseover', handleHover.bind(0.5));
document.querySelector('nav').addEventListener('mouseout', handleHover.bind(1));
