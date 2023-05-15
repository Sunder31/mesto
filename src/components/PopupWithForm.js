import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({popupSelector, submitFormCallback}){
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
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
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            this._submitFormCallback(this._getInputValues());

            this.close()
        });
        super.setEventListeners();
    }

    close(){
        super.close();
        this._formElement.reset();
    }
}

export {PopupWithForm};
