
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.popup__container');
let nameInput = formElement.querySelector('.form__input_el_name');
let jobInput = formElement.querySelector('.form__input_el_about');
let nameValue = document.querySelector('.profile__name');
let jobValue = document.querySelector('.profile__about');



const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = nameValue.textContent ;
    jobInput.value = jobValue.textContent;
};

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
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