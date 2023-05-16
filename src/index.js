import './pages/index.css';
import {Card} from './components/Card.js';
import {initialCards} from './utils/initialCards.js';
import {validationConfig} from './utils/validationConfig.js';
import {FormValidator} from './components/FormValidator.js'
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import {editProfileButton, addElementButton} from './utils/constants.js'

const viewCardImage = new PopupWithImage('.popup_image-view');

const createCard = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            viewCardImage.open(item);
        }
    },
    '#template-item');
    console.log('1')
    console.log(item)
    console.log('2')
    console.log(card)


    const cardElement = card.generateCard();
    return cardElement
};

const cardsContainer = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardsContainer.addItem(cardElement);
     },
    },
    '.elements'
);

cardsContainer.renderItems();

const userData = new UserInfo({
    userName: '.profile__name',
    userAbout: '.profile__about',
});
    
const editProfilePopup = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    submitFormCallback: (data) => {
        userData.setUserInfo(data);
    }
});

const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-element',
    submitFormCallback: (data) => {
        const card = createCard(data);

        console.log('55')
        console.log(data)
        cardsContainer.addItem(card);
    }
});


const addFormValidator = new FormValidator(validationConfig, addCardPopup.getPopupForm()); // добавление валидатора для формы добавления карточек
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, editProfilePopup.getPopupForm());
editFormValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
    const userObj = userData.getUserInfo();
    editProfilePopup.setInputValue(userObj);

    editProfilePopup.open();
});

addElementButton.addEventListener('click', () => {
    addCardPopup.open();
});

viewCardImage.setEventListeners();

editProfilePopup.setEventListeners();

addCardPopup.setEventListeners();