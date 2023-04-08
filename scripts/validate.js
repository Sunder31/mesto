const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible',
  };

const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector))
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, rest);
    });
};

const setEventListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const formInputs = Array.from(form.querySelectorAll(inputSelector))
    const formButton = form.querySelector(submitButtonSelector)
    disableButton(formButton, inactiveButtonClass);
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, rest)
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, inactiveButtonClass)
            } else {
                enableButton(formButton, inactiveButtonClass)
            }
        });
    });
};

const checkInputValidity = (input, {inputErrorClass, errorClass}) => {
    const inputErrorContainer = document.querySelector(`.${input.id}-error`)
    if(input.checkValidity()) { 
        inputErrorContainer.textContent = '';
        inputErrorContainer.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    } else {
        inputErrorContainer.textContent = input.validationMessage;
        input.classList.add(inputErrorClass);
        inputErrorContainer.classList.add(errorClass);
    }
}


const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid)
}

const enableButton = (formButton, inactiveButtonClass) => {
    formButton.classList.remove(inactiveButtonClass);
    formButton.removeAttribute('disabled', '');
}

const disableButton = (formButton, inactiveButtonClass) => {
    formButton.classList.add(inactiveButtonClass);
    formButton.setAttribute('disabled', '');
}

enableValidation(validationConfig)