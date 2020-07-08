'use strict';
const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item'),
    catalog = document.querySelector('.catalog'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

/*обработчик внутри формы подачи объявления */
modalSubmit.addEventListener('input', () => { /* прячем/показываем надпись */
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => { /* добавляем объявление в базу */
    event.preventDefault();
    const itenObj = {};
    for (const elem of elementModalSubmit) {
        itenObj[elem.name] = elem.value;
    };

    dataBase.push(itenObj);
    modalSubmit.reset();
    modalBtnSubmit.disabled = true;
    modalBtnWarning.style.display = '';
})

/* функция закрытия модальных окон */
const closeModal = function(event) {
    const target = event.target;

    if (target.closest('.modal__close') || target === this) {
        this.classList.add('hide');
        if (this === modalAdd) { modalSubmit.reset() }
    };
    document.removeEventListener('keydown', closeModalEsc);
};

/* обработка нажатия клавиши ESC */
const closeModalEsc = function(event) {
    if (event.code === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    };
    document.removeEventListener('keydown', closeModalEsc);
}

/*открытие модальной формы ввода объявления */
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEsc);
});

/*вызов модальной формы карточки товара */
catalog.addEventListener('click', event => {
    if (event.target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
    }
});

/* закрытие форм */
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);