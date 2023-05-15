import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector)
    }

    open(data){
        this._popup.querySelector('.popup__image').src = data.link;
        this._popup.querySelector('.popup__image').alt = data.name;
        this._popup.querySelector('.popup__image-subtitle').textContent = data.name;
       
        super.open();
    }


}

export {PopupWithImage};