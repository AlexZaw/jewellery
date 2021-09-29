'use strict';

// const faqList = document.querySelector('.faq ul');

// faqList.addEventListener('click', (evt) => {
//   const target = evt.target;
//   if(target.classList.contains('faq__question-button')){
//     target.closest('.faq__question').classList.toggle('faq__question--open');
//   }
// });

const showSlidesCounter = () =>{
  const currentSlideIndex = $('.slider__pagination li')
    .index($('.slider__pagination .slick-active'));
  const totalPages = $('.slider__pagination').children().length;
  const countCurrent = $('.slider-counter__current');
  const countTotal = $('.slider-counter__total');
  countCurrent.text(currentSlideIndex + 1);
  countTotal.text(totalPages);
};

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
}).slick('refresh');
$('.slider__list').on('afterChange', showSlidesCounter);

