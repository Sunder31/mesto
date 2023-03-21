const initialCards = [
    {
      name: 'Крисси Костанза',
      link: 'https://media.tenor.com/CwzryBmEzW8AAAAC/you-got-it-chrissy-costanza.gif'
    },
    {
      name: 'Билли Бутчер',
      link: 'https://media.tenor.com/T3dxQvlBqwAAAAAC/taking-a-drink-billy-butcher.gif'
    },
    {
      name: 'Марти Макфлай',
      link: 'https://media.tenor.com/xBuK0Ee9m58AAAAd/whoa-glasses-off.gif'
    },
    {
      name: 'Гена Букин',
      link: 'https://media.tenor.com/JXXPkPLgYUIAAAAd/gena-bukin.gif'
    },
    {
      name: 'Скала',
      link: 'https://media.tenor.com/prT_agJ7F98AAAAd/the-rock-the-rock-sus.gif'
    },
    {
      name: 'Папич',
      link: 'https://media.tenor.com/wcTAJ_FqG0oAAAAC/папич.gif'
    }
  ];

// Попапы
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
const editProfileFormElement = popupEditProfile.querySelector('.form');
const addElementFormElement = popupAddElement.querySelector('.form');


// Инпуты формы редактирования профиля
const nameInput = editProfileFormElement.querySelector('.form__input_el_name');
const jobInput = editProfileFormElement.querySelector('.form__input_el_about');
const nameValue = document.querySelector('.profile__name');
const jobValue = document.querySelector('.profile__about');

// Инпуты формы добавления карточки
const placeInput = addElementFormElement.querySelector('.form__input_place-name');
const linkInput = addElementFormElement.querySelector('.form__input_image-link');

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

editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
addElementFormElement.addEventListener('submit', handleAddElementFormSubmit);

// функция создания карточек
function createCard(name, link){
    const cardElement = templateCard.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__delete-button').addEventListener('click', cardDeleteButton);
    cardElement.querySelector('.element__picture').src = link;
    cardElement.querySelector('.element__picture').alt = name;
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__like-button').addEventListener('click', likeCardToggle);
    elements.prepend(cardElement);
    return cardElement;
}

// функция для добавления карточек
function addCard() {
    addElementFormElement.addEventListener('submit', function(evt){
        createCard(placeInput.value, linkInput.value);
    })
}
addCard()

// Добавление карточек из массива
initialCards.forEach(data => { createCard(data.name, data.link); });

const popupImageViewOpen = document.querySelector('.element__picture');

// Просмотр картинки 
function ImageView(evt) {
    document.querySelector('.popup__image').src = evt.currentTarget.closest('.element__picture').src;
    document.querySelector('.popup__image-subtitle').textContent = evt.currentTarget.closest('.element__picture').alt
    openPopup(popupImageView)
  }

popupImageViewOpen.addEventListener('click', ImageView)


  // Удаление карточки
function cardDeleteButton(evt){
    evt.target.closest('.element').remove();
}


// Кнопка лайка
function likeCardToggle(evt){
    evt.target.classList.toggle('element__like-button_active');
}


