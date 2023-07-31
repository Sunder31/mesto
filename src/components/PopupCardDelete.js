import { Popup } from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector, {removeCard}){
        super(popupSelector)
        this._confirmButton = this._popup.querySelector('.popup__submit-button')
        this._removeCard = removeCard;
    }

    setEventListeners(){
        this._confirmButton.addEventListener('click', () => {
            this._removeCard(this._item, this._itemId)
        })
        super.setEventListeners()
    }

    open(item, itemId){
        super.open();
        this._item = item;
        this._itemId = itemId;
    }
}

export {PopupCardDelete};
