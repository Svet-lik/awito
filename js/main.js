'use strict';

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
        target === modalAdd) {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }

});

document.addEventListener('click', event => {
    if (event.target.closest('.catalog')) {
        modalItem.classList.remove('hide');
    }
});

modalItem.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
        target === modalItem) {
        modalItem.classList.add('hide');
    }
});

document.addEventListener('keydown', event => {
    const target = event.target;

    if (event.keyCode === 27) {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }

})