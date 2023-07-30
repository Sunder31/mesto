class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getUserInfo() {
      const promise = fetch(`${this._baseUrl}/users/me`,{
        headers: {
            authorization: this._headers.authorization,
        }
      });

      return this._promiseResult(promise)
    }
  
    getInitialCards(){
        const promise = fetch(`${this._baseUrl}/cards`,{
            headers: {
                authorization: this._headers.authorization,
            }
        })
        
        return this._promiseResult(promise)
    }
    
    _promiseResult(promise){
        return promise.then(res => {
            if(res.ok){
                return res.json()
            } else {
               return Promise.reject(`Ошибка: ${res.status}`)
            }
        })
    }

    renderInitialData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    editUserInfo(inputValues){
        const promise = fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.username,
                about: inputValues.userabout,
            })
        })
        return this._promiseResult(promise);
    }

    addNewCard(inputValues){
        const promise = fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.imageName,
                link: inputValues.imageLink,
            })
        })
        return this._promiseResult(promise);
    }

    deleteCard(id) {
        const promise = fetch(`${this._baseUrl}/cards/${id}`, {
          method: 'DELETE',
          headers: {
            authorization: this._headers.authorization,
          },
        });
    
        return this._promiseResult(promise);
      }

    likeCard(cardId){
        const promise = fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
            },
        })
        return this._promiseResult(promise);
    }

    removeLike(cardId){
        const promise = fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
            },
        })
        return this._promiseResult(promise);
    }

    changeAvatar(url){
        const promise = fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        })
        return this._promiseResult(promise);
    }
  }
  
  export {Api};