'use strict';
const faqList = document.querySelector('.faq ul');

faqList.addEventListener('click', (evt) => {
  const target = evt.target;
  if(target.classList.contains('faq__question-button')){
    target.closest('.faq__question').classList.toggle('faq__question--open');
  }
});
