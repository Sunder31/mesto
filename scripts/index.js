import {Card} from './Card.js';
import {initialCards} from './constants.js';
import {validationConfig} from './validationConfig.js';
import {FormValidator} from './FormValidator.js'


// ПопапыpopupImageView
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupImageView = document.querySelector('.popup_image-view');

// Template
const templateCard = document.querySelector('#template-item').content;
const elements = document.querySelector('.elements');

// Кнопки открывающие попапы
const popupEditProfileOpen = document.querySelector('.profile__edit-button');
const popupAddElementOpen = document.querySelector('.profile__add-button');

// Функция для открытия попапа
const openPopup = function (popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByPressingEscape);
};

// Открытие попапов
popupEditProfileOpen.addEventListener('click', function() {
    openPopup(popupEditProfile)
    nameInput.value = nameValue.textContent ; // эти две строки позволяют
    jobInput.value = jobValue.textContent; //открывать попап с ранее введенным текстом

});

popupAddElementOpen.addEventListener('click', function() {
    openPopup(popupAddElement)
    formAddCard.reset();
});

// Кнопки закрытия попапа
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close-button');
const popupAddElementClose = popupAddElement.querySelector('.popup__close-button');
const popupImageViewClose = popupImageView.querySelector('.popup__close-button');

// функция для закрытия попапов
const closePopup = function(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByPressingEscape);
};

// Закрытие попапов при клике на кнопку
popupEditProfileClose.addEventListener('click', function() {
    closePopup(popupEditProfile)
});

popupAddElementClose.addEventListener('click', function() {
    closePopup(popupAddElement)
});

popupImageViewClose.addEventListener('click', function() {
    closePopup(popupImageView)
});

// закрытие попапа при нажатии клавиши Escape
const closePopupByPressingEscape = function(event){
    if (event.key === 'Escape'){
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
};


// закрытие попапа при клике по оверлею
const closePopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(event.target);
}


popupEditProfile.addEventListener('click', closePopupByClickOnOverlay)
popupAddElement.addEventListener('click', closePopupByClickOnOverlay)
popupImageView.addEventListener('click', closePopupByClickOnOverlay)

// Формы
const formEditProfile = popupEditProfile.querySelector('.form');
const formAddCard = popupAddElement.querySelector('.form');

// Инпуты формы редактирования профиля
const nameInput = formEditProfile.querySelector('.form__input_el_name');
const jobInput = formEditProfile.querySelector('.form__input_el_about');
const nameValue = document.querySelector('.profile__name');
const jobValue = document.querySelector('.profile__about');

// Инпуты формы добавления карточки
const placeInput = formAddCard.querySelector('.form__input_place-name');
const linkInput = formAddCard.querySelector('.form__input_image-link');

// Отправка форм
function handleEditProfileFormSubmit (evt) {
    evt.preventDefault();

    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

function handleAddElementFormSubmit (evt) {
    evt.preventDefault();
    const data = {
        name: placeInput.value,
        link: linkInput.value,
        alt: placeInput.value,
    };
    
    addCard(data, elements);
    closePopup(popupAddElement);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddElementFormSubmit);

// Просмотр картинки 
const openImagePopup = (data) => {
    popupImagePictureInfo.src = data.link;
    popupImagePictureInfo.alt = data.alt;
    popupImageSubtitleInfo.textContent = data.alt;
    openPopup(popupImageView)
  }

// функция создания карточек
const createCard = (data) => {

    const card = new Card(data, '#template-item', openImagePopup)
    const cardElement = card.generateCard();
    return cardElement;
}
// Функция добавления карточки
const addCard = (data, elements) => {
    elements.prepend(createCard(data));
}

// добавление карточки
formAddCard.addEventListener('submit', function(evt){
    createCard(placeInput.value, linkInput.value);
});

// Добавление карточек из массива
initialCards.forEach((card) => {
    addCard(card, elements)
});


const popupImagePictureInfo = popupImageView.querySelector('.popup__image');
const popupImageSubtitleInfo = popupImageView.querySelector('.popup__image-subtitle');

const addFormValidator = new FormValidator(validationConfig, formAddCard)
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(validationConfig, formEditProfile)
editFormValidator.enableValidation()