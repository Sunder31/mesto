// ПопапыpopupImageView
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupImageView = document.querySelector('.popup_image-view');

// Template
const templateCard = document.querySelector('.template-item').content;
const elements = document.querySelector('.elements');

// Кнопки открывающие попапы
const popupEditProfileOpen = document.querySelector('.profile__edit-button');
const popupAddElementOpen = document.querySelector('.profile__add-button');

// Функция для открытия попапа
const openPopup = function (popup){
    popup.classList.add('popup_opened');
}

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
}

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

// закрытие попапа при клике по оверлею
const closeEditProfilePopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(popupEditProfile);
}

const closeAddElementPopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(popupAddElement);
}

const closeImageViewPopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(popupImageView);
}

popupEditProfile.addEventListener('click', closeEditProfilePopupByClickOnOverlay)
popupAddElement.addEventListener('click', closeAddElementPopupByClickOnOverlay)
popupImageView.addEventListener('click', closeImageViewPopupByClickOnOverlay)

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
    closePopup(popupAddElement);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddElementFormSubmit);

// функция создания карточек
function createCard(name, link){
    const cardElement = templateCard.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__delete-button').addEventListener('click', cardDeleteButton);
    const cardInfo = cardElement.querySelector('.element__picture');
        cardInfo.src = link;
        cardInfo.alt = name;
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__like-button').addEventListener('click', likeCardToggle);
    elements.prepend(cardElement);
    return cardElement;
}

// добавление карточки
formAddCard.addEventListener('submit', function(evt){
    createCard(placeInput.value, linkInput.value);
});

// Добавление карточек из массива
initialCards.forEach(data => { createCard(data.name, data.link); });

const popupImageViewOpen = document.querySelector('.element__picture');
const popupImagePictureInfo = popupImageView.querySelector('.popup__image');
const popupImageSubtitleInfo = popupImageView.querySelector('.popup__image-subtitle');

// Просмотр картинки 
function openImagePopup(evt) {
    popupImagePictureInfo.src = evt.currentTarget.closest('.element__picture').src;
    popupImagePictureInfo.alt = evt.currentTarget.closest('.element__picture').alt;
    popupImageSubtitleInfo.textContent = evt.currentTarget.closest('.element__picture').alt;
    openPopup(popupImageView)
  }

popupImageViewOpen.addEventListener('click', openImagePopup)

  // Удаление карточки
function cardDeleteButton(evt){
    evt.target.closest('.element').remove();
}

// Кнопка лайка
function likeCardToggle(evt){
    evt.target.classList.toggle('element__like-button_active');
}
