'use strict';
// const faqList = document.querySelector('.faq ul');

// faqList.addEventListener('click', (evt) => {
//   const target = evt.target;
//   if(target.classList.contains('faq__question-button')){
//     target.closest('.faq__question').classList.toggle('faq__question--open');
//   }
// });


$('.slider__list').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  dots: true,
  swipe: false,
  prevArrow: '.slider__arrow--prev',
  nextArrow: '.slider__arrow--next',
  appendDots: '.slider__pagination-wrapper',
  dotsClass: 'slider__pagination',

  responsive: [{
    breakpoint: 1024,
    settings: {
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: true,
      dots: true,
      swipe: true,
    },
  }, {
    breakpoint: 768,
    settings: {
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      swipe: true,
    },
  }],
});
const suffix = document.querySelector('#suffix').content
  .querySelector('.slider__pagination-suffix');

const clone = suffix.cloneNode(true);
const pagination = document.querySelector('.slider__pagination');
pagination.insertAdjacentElement('beforeend', clone);
