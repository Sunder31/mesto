class UserInfo {
    constructor({userName, userAbout}){
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }

    getUserInfo(){
      this._userInfo = {
            username: this._userName.textContent,
            userabout: this._userAbout.textContent,
        }
        return this._userInfo;
    }

    setUserInfo(data){
        this._userName.textContent = data.username;
        this._userAbout.textContent = data.userabout;
    }
}

export {UserInfo};