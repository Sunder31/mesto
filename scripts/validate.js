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
        setEventListeners(form, rest);
    });
};

const setEventListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const formInputs = Array.from(form.querySelectorAll(inputSelector))
    const formButton = form.querySelector(submitButtonSelector)
    disableButton(formButton, inactiveButtonClass);

    form.addEventListener('reset', () => {
        disableButton(formButton, inactiveButtonClass);
      });    

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

const checkInputValidity = (input, {...rest}) => {
    if(input.checkValidity()) { 
        hideInputError(input, rest);
    } else {
        showInputError(input, rest);
    }
}


const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid)
}

const showInputError = (input, {inputErrorClass, errorClass}) => {
    const inputErrorContainer = document.querySelector(`.${input.id}-error`)
    inputErrorContainer.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    inputErrorContainer.classList.add(errorClass);
}

const hideInputError = (input, {inputErrorClass, errorClass}) => {
    const inputErrorContainer = document.querySelector(`.${input.id}-error`)
    inputErrorContainer.textContent = '';
    inputErrorContainer.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
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