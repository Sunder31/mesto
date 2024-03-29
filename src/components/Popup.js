class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })

        this._popup.addEventListener('click', (evt) => {
            if(evt.target !== evt.currentTarget){
                return
            }
            this.close();
        })
    }
}

export {Popup}