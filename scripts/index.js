
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.button__edit-profile');
const popupCloseButtonElement = popupElement.querySelector('.button__close');
const formElement = popupElement.querySelector('.popup__container');
let nameInput = formElement.querySelector('.input__name');
let jobInput = formElement.querySelector('.input__about');
let nameValue = document.querySelector('.profile__name');
let jobValue = document.querySelector('.profile__about');



const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = nameValue.textContent ;
    jobInput.value = jobValue.textContent;
};

const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
};

const closePopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget) {
    return;
    }
    closePopup();
}



function handleFormSubmit (evt) {
    evt.preventDefault();

    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;

    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);