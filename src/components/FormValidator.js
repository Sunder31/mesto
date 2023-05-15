class FormValidator {
    constructor(config, formElement){
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        
    }

    _showInputError(input, errorMessage){
        const inputError = this._formElement.querySelector(`.${input.id}-error`)
        inputError.textContent = errorMessage;
        input.classList.add(this._inputErrorClass);
        inputError.classList.add(this._errorClass);
    }

    _hideInputError(input){
        const inputError = this._formElement.querySelector(`.${input.id}-error`)
        inputError.textContent = '';
        input.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
    }

    _checkInputValidity(input){
        if(!input.validity.valid) { 
            this._showInputError(input, input.validationMessage);
            this._disableButton()
        } else {
            this._hideInputError(input);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
          return !input.validity.valid;
        });
      }
    
    _enableButton(){
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled', '');
    }
    
    _disableButton(){
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', '');
    }
    
    _setEventListeners(){
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                if (this._hasInvalidInput()) {
                    this._disableButton();
                } else {
                    this._enableButton();
                }
            });
        });
        

        this._formElement.addEventListener('reset', () => {
            this._disableButton();
        });
    }

    enableValidation() {
        this._disableButton();
        this._setEventListeners();
    }
}

export {FormValidator};