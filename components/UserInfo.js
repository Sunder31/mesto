class UserInfo {
    constructor({userName, userAbout, userAvatar}){
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo(){
        this._userInfo = {
            username: this._userName.textContent,
            userabout: this._userAbout.textContent,
        }
        return this._userInfo;
    }

    setUserInfo(data){
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this.setUserAvatar(data);
    }

    setUserAvatar(data){
        this._userAvatar.src = data.avatar;
    }
}

export {UserInfo};