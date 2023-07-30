class Card {
    constructor({data, handleCardClick, handleDeleteCard, handleLikeCard}, templateSelector){
        this._item = data.item;
        this._name = this._item.name;
        this._link = this._item.link;
        this._likes = this._item.likes;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return card
    }

    likeIsActive() {
        this._likeButton.classList.add('element__like-button_active');
    }

    likeInactive() {
        this._likeButton.classList.remove('element__like-button_active');
    }


    changeLikesCounter(likesArr){
        this._likeCounter.textContent = likesArr.length;
    }

    isLiked(likesArr) {
        const myLike = likesArr.find((like) => {
          return like._id === this._userId;
        });
    
        return myLike;
      }
      
      deleteCard = () =>{
        this._cardElement.remove();
        this._cardElement = null;
      }

    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._imageElement = this._cardElement.querySelector('.element__picture');

        this._likeButton.addEventListener('click', () =>{
            this._handleLikeCard(this._item._id)
        });
        this._deleteButton.addEventListener('click', () =>{
            this._handleDeleteCard(this, this._item._id)
        });
        this._imageElement.addEventListener('click', this._handleCardClick.bind(this));
    }

    generateCard() {
        this._cardElement = this._getTemplate();
        this._likeCounter = this._cardElement.querySelector('.element__like-counter');
        this._setEventListeners();
        this.changeLikesCounter(this._likes);
        
        if (this.isLiked(this._likes)) {
            this.likeIsActive();
          } else {
            this.likeInactive();
          }

        if(this._ownerId !== this._userId){
            this._deleteButton.remove();
            this._deleteButton = null;
        };

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardElement.querySelector('.element__name').textContent = this._name;
       
        return this._cardElement;
    }
}

export {Card}