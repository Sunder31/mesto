 class Card {
    constructor({ data, handleCardClick }, templateSelector){
        this._data = data;
        this._name = data.placeName;
        this._link = data.imageLink;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return card
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard = () => {
        this._element.remove();
    }

    _setEventListeners() {
        // ищем конкретные элементы
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._elementPicture = this._element.querySelector('.element__picture');
        // вешаем слушатели
        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._elementPicture.addEventListener('click', this._handleCardClick);
    }
        //отрисовка карточек в разметке
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._elementPicture.src = this._link;
        this._elementPicture.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        return this._element;
    }
}

export {Card};
