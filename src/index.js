import './pages/index.css';
import {Card} from './components/Card.js';
import {validationConfig} from "./utils/validationConfig.js";
import {FormValidator} from './components/FormValidator.js'
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupCardDelete } from './components/PopupCardDelete.js';
import { UserInfo } from './components/UserInfo.js';
import {editProfileButton, addCardButton, changeAvatarButton} from './utils/constants.js'
import { Api } from './components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
    headers: {
      authorization: '506c723b-3b50-4120-bc2e-27b20195cd7b',
      'Content-Type': 'application/json',
    },
})

api.renderInitialData()
    .then(result => {
        const [initialUserInfo, initialCards] = result;
        const userInfo = new UserInfo({
            userName: '.profile__name',
            userAbout: '.profile__about',
            userAvatar: '.avatar',
        })
        userInfo.setUserInfo(initialUserInfo);

        const openCardImage = new PopupWithImage('.popup_image-view');

        const popupCardDelete = new PopupCardDelete(
            '.popup_delete-element', {
            removeCard: (card, cardId) => {
                api.deleteCard(cardId)
                    .then(() => {
                        card.deleteCard()
                        popupCardDelete.close()
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
        })

    const createCard = (item) => {
        const card = new Card({
            data: { 
                item,
                userId: initialUserInfo._id,
                ownerId: item.owner._id,
            },
            handleCardClick: () => {
                openCardImage.open(item);
            },
            handleDeleteCard: (card, cardId) => {
                popupCardDelete.open(card, cardId)
            },
            handleLikeCard: (cardId) => {
                const isLiked = card.isLiked(item.likes)

                if(isLiked){
                    api.removeLike(cardId)
                        .then(result => {
                            card.likeInactive();
                            card.changeLikesCounter(result.likes);
                            item = result;

                            return item;
                        })
                        .catch(err => {
                            console.error(err)
                        })
                } else {
                    api.likeCard(cardId)
                        .then(result => {
                            card.likeIsActive();
                            card.changeLikesCounter(result.likes);
                            item = result;

                            return item;
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            }
        }, '#template-item');

        const cardElement = card.generateCard();
        return cardElement;
    };

    const cardsContainer = new Section({
        items: initialCards.reverse(),
        renderer: (cardItem) => {
            const cardElement = createCard(cardItem);
            cardsContainer.addItem(cardElement);
        }
    }, '.elements');

    const editProfilePopup = new PopupWithForm({
        popupSelector: '.popup_edit-profile',
        submitFormCallback: (data) => {
            api.editUserInfo(data)
                .then(res => {
                    userInfo.setUserInfo(res);
                    editProfilePopup.close();
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    editProfilePopup.renderLoading(false)
                })
        }
    });

    const addCardPopup = new PopupWithForm({
        popupSelector: '.popup_add-element',
        submitFormCallback: (data) => {
            api.addNewCard(data)
                .then(res => {
                    const card = createCard(res);
                    cardsContainer.addItem(card);
                    addCardPopup.close();
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    addCardPopup.renderLoading(false)
                })
        }
    });

    const editAvatarPopup = new PopupWithForm({
        popupSelector: '.popup_change-avatar',
        submitFormCallback: (data) =>{
            api.changeAvatar(data.avatar)
                .then(res => {
                    userInfo.setUserAvatar(res);
                    editAvatarPopup.close();
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    addCardPopup.renderLoading(false)
                })
        }
    })

    const allowEditProfileValidation = new FormValidator(validationConfig, editProfilePopup.getPopupForm());
    allowEditProfileValidation.enableValidation();

    const allowAddCardValidation = new FormValidator(validationConfig, addCardPopup.getPopupForm());
    allowAddCardValidation.enableValidation();

    const allowAvatarValidation = new FormValidator(validationConfig, editAvatarPopup.getPopupForm());
    allowAvatarValidation.enableValidation();

    return {
        userInfo,
        editProfilePopup,
        addCardPopup,
        cardsContainer,
        openCardImage,
        popupCardDelete,
        editAvatarPopup,
    }
})
.then(data => {
    const {
        userInfo,
        editProfilePopup,
        addCardPopup,
        cardsContainer,
        openCardImage,
        popupCardDelete,
        editAvatarPopup,
    } = data;
    
    editProfilePopup.setEventListeners();
    addCardPopup.setEventListeners();
    cardsContainer.rendrtItems();
    openCardImage.setEventListeners();
    popupCardDelete.setEventListeners();
    editAvatarPopup.setEventListeners();

    addCardButton.addEventListener('click', () => {
        addCardPopup.open()
    })

    editProfileButton.addEventListener('click', () =>{
        const userObj = userInfo.getUserInfo()
        editProfilePopup.setInputValue(userObj)

        editProfilePopup.open()
    })

    changeAvatarButton.addEventListener('click', () => {
        editAvatarPopup.open()
    })
})
.catch(err => {
    console.error(err)});