'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item'),
    catalog = document.querySelector('.catalog'),
    modalBtnWarning = document.querySelector('.modal__btn-warning'),
    modalFileInput = document.querySelector('.modal__file-input'),
    modalFileBtn = document.querySelector('.modal__file-btn'),
    modalImageAdd = document.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

/* сохранение данных в localStorage */
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const infoFoto = {};

/*обработчик внутри формы подачи объявления */
const checkForm = () => {
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

/* функция закрытия модальных окон */
const closeModal = event => {
    const target = event.target;
    if (target.closest('.modal__close') ||
        target.classList.contains('modal') ||
        event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        checkForm();
        modalImageAdd.src = 'img/temp.jpg';
        modalFileBtn.textContent = 'Добавить фото';
    }
};


const elementModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

/* генерация карточек */
const renderCard = () => {
    catalog.textContent = '';
    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
                <li class="card" data-id="${i}">
                    <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="${item.nameItem}"> 
                    <div class = "card__description">
                        <h3 class = "card__header">${item.nameItem}</h3> 
                        <div class = "card__price">${item.costItem} ₽</div> 
                    </div> 
                </li>
                `);
    });
}

/* добавляем объявление в базу */
modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itenObj = {};
    for (const elem of elementModalSubmit) {
        itenObj[elem.name] = elem.value;
    };
    itenObj.image = infoFoto.base64;
    dataBase.push(itenObj);
    closeModal({ target: modalAdd });
    saveDB();
    renderCard();
});

/* Загрузка объявлений */
modalFileInput.addEventListener('change', event => {
    const target = event.target,
        reader = new FileReader(),
        file = target.files[0];

    infoFoto.filename = file.name;
    infoFoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', event => {
        if (infoFoto.size < 200000) {
            let im = infoFoto.filename;
            modalFileBtn.textContent = im.replace(/\.[^.]+$/, "");
            infoFoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoFoto.base64}`;
        } else {
            modalFileBtn.textContent = 'Файл не более 200кб';
            modalFileInput.value = '';
            checkForm();
        }
    });
});

modalSubmit.addEventListener('input', checkForm); /* прячем/показываем надпись */

/*открытие модальной формы ввода объявления */
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

/*вызов модальной формы карточки товара */
catalog.addEventListener('click', event => {
    const target = event.target;

    const modalHeaderItem = document.querySelector('.modal__header-item'),
        modalStatusItem = document.querySelector('.modal__status-item'),
        modalDescriptionItem = document.querySelector('.modal__description-item'),
        modalCostItem = document.querySelector('.modal__cost-item'),
        modalImageItem = document.querySelector('.modal__image-item');

    let numberId = target.parentElement.dataset.id;
    if (!numberId) { numberId = target.parentElement.parentElement.dataset.id; };

    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        modalHeaderItem.textContent = dataBase[numberId].nameItem;
        modalImageItem.src = 'data:image/jpeg;base64,' + dataBase[numberId].image;
        if (dataBase[numberId].status === 'old') {
            modalStatusItem.textContent = 'б/у'
        } else {
            modalStatusItem.textContent = 'отличное'
        };
        modalDescriptionItem.textContent = dataBase[numberId].descriptionItem;
        modalCostItem.textContent = dataBase[numberId].costItem + ' ₽';

        document.addEventListener('keydown', closeModal);
    }
});

/* закрытие форм */
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

renderCard();