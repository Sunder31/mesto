import { Popup } from "./Popup.js";

class PopupWithForm extends Popup{
    constructor({popupSelector, submitFormCallback}){
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
        this._formElementButton = this._popup.querySelector('.popup__submit-button');
        this._buttonText = this._formElementButton.textContent;
    }

    _getInputValues(){
        this._inputValues = {};

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    getPopupForm(){
        return this._formElement
    }

    setInputValue(data){
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);

            this._submitFormCallback(this._getInputValues());
        })
    }

    close(){
        super.close();
        this._formElement.reset();
    }

    renderLoading(isLoading){
        if(isLoading){
            this._formElementButton = 'Сохранение...';
        }else {
            this._formElementButton = this._buttonText;
        }
    }
}

export {PopupWithForm}