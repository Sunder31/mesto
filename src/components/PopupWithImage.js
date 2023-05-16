import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupSubtitle = this._popup.querySelector('.popup__image-subtitle');
    }

    open(data){
        this._popupImage.src = data.imageLink;
        this._popupImage.alt = data.placeName;
        this._popupSubtitle.textContent = data.placeName;
       
        super.open();
    }


}

export {PopupWithImage};