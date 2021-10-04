'use strict';
document.body.classList.remove('no-js');
const filterControl = document.querySelector('.catalog__filters-control');
const mobileMenuButton = document.querySelector('.page-header__menu-button');
const loginLinks = document.querySelectorAll('.login-link');
const accordeons = document.querySelectorAll('.accordeon');
const userData = {
  email: '',
};
const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isStorage = () => {
  try{
    userData.email = localStorage.getItem('userEmail');
    return true;
  } catch (err) {
    return false;
  }
};
const isStorageSupport = isStorage();

const fillForm = (form) => {
  isStorage();
  if(userData.email){
    form['login-email'].value = userData.email;
  }
};

const formDataSave = (form) => {
  if (isStorageSupport) {
    localStorage.setItem('userEmail', form['login-email'].value);
  }
};

const onFormSubmit = (evt) =>{
  const target = evt.target.closest('form');
  formDataSave(target);
};
const bodyFixPosition = () => {
  setTimeout( () => {
    if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('data-body-scroll-fix', scrollPosition);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${  scrollPosition  }px`;
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
  }, 15 );
};

const bodyUnfixPosition = () => {
  if ( document.body.hasAttribute('data-body-scroll-fix') ) {
    const scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    document.body.removeAttribute('data-body-scroll-fix');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scroll(0, scrollPosition);
  }
};

const closeFilters = (evt, flag = false) =>{
  const filterForm = document.querySelector('.filter-form');
  const filterFormParent = document.querySelector('.catalog__filters');
  if(flag || isEscKey(evt) || (evt.type === 'click' && evt.target.classList.contains('filter-form__close') ||
  evt.target === filterFormParent)){
    bodyUnfixPosition();
    filterFormParent.classList.remove('catalog__filters--show');
    filterForm.classList.remove('catalog__filter-form--show');
    document.removeEventListener('keydown', closeFilters);
    window.removeEventListener('resize', checkScreenSize);
  }
};

function checkScreenSize() {
  if(document.documentElement.clientWidth > 1023) {
    closeFilters(null, true);
  }
}

const showFilters = () => {
  const filterForm = document.querySelector('.filter-form');
  const filterFormParent = document.querySelector('.catalog__filters');
  if(filterForm && filterFormParent){
    bodyFixPosition();
    filterFormParent.classList.add('catalog__filters--show');
    filterForm.classList.add('catalog__filter-form--show');
    filterFormParent.addEventListener('click', closeFilters);
    document.addEventListener('keydown', closeFilters);
    window.addEventListener('resize', checkScreenSize);
  }
};

const closeMobileMenu = () => {
  const mobileMenuParent = document.querySelector('.page-header');
  bodyUnfixPosition();
  mobileMenuParent.classList.remove('page-header--menu-open');
};

const openMobileMenu = () => {
  const mobileMenuParent = document.querySelector('.page-header');
  if(mobileMenuParent.classList.contains('page-header--menu-open')){
    closeMobileMenu();
  }else{
    bodyFixPosition();
    mobileMenuParent.classList.add('page-header--menu-open');
  }
};


if (filterControl){
  filterControl.addEventListener('click', showFilters);
}

if(accordeons) {
  accordeons.forEach((accordeon) => {
    accordeon.addEventListener('click', (evt) => {
      const target = evt.target;
      if(target.classList.contains('accordeon__control') || target.classList.contains('accordeon__button')){
        target.closest('.accordeon__item').classList.toggle('accordeon__item--open');
      }
    });
  });
}
const showSlidesCounter = () =>{
  const currentSlideIndex = $('.slider__pagination li')
    .index($('.slider__pagination .slick-active'));
  const totalPages = $('.slider__pagination').children().length;
  const countCurrent = $('.slider-counter__current');
  const countTotal = $('.slider-counter__total');
  countCurrent.text(currentSlideIndex + 1);
  countTotal.text(totalPages);
};

if(mobileMenuButton){
  mobileMenuButton.addEventListener('click', openMobileMenu );
}

const checkPopupCoords = () =>{
  const loginPopup = document.querySelector('.login--popup');
  const loginWrapper = document.querySelector('.login__wrapper');
  if(parseInt(getComputedStyle(loginWrapper).height, 10) > document.documentElement.clientHeight){
    loginPopup.classList.add('login--align');
  } else {
    loginPopup.classList.remove('login--align');
  }
};

const closeLoginPopup = (evt) => {
  const closeLogin = document.querySelector('.login__close');
  const loginPopup = document.querySelector('.login--popup');
  if(isEscKey(evt) || (evt.type === 'click' && evt.target.classList.contains('login--popup') ||
  evt.target === closeLogin)){
    loginPopup.remove();
    bodyUnfixPosition();
    window.removeEventListener('resize', checkPopupCoords);

  }
};


const showLoginPopup = (evt) => {
  evt.preventDefault();
  const loginTemplate = document.querySelector('#login-template').content
    .querySelector('.login');
  const mobileMenuParent = document.querySelector('.page-header--menu-open');
  const loginClone = loginTemplate.cloneNode(true);
  loginClone.classList.add('login--popup');
  loginClone.addEventListener('click', closeLoginPopup);
  const form = loginClone.querySelector('form');
  loginClone.querySelector('[type="submit"]').addEventListener('click', onFormSubmit);
  if(mobileMenuParent){
    closeMobileMenu();
  }
  document.body.insertAdjacentElement('afterbegin', loginClone);
  fillForm(form);
  if(form['login-email'].value === ''){
    form['login-email'].focus();
  }else{
    form['login-password'].focus();
  }
  bodyFixPosition();
  document.addEventListener('keydown', closeLoginPopup);
  window.addEventListener('resize', checkPopupCoords);
  checkPopupCoords();
};

loginLinks.forEach((el) =>{
  el.addEventListener('click', showLoginPopup);
});

$('.slider__list').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
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
      slidesToScroll: 2,
      arrows: false,
      dots: true,
      swipe: true,
    },
  }],
}).slick('refresh');
$('.slider__list').on('afterChange', showSlidesCounter);

