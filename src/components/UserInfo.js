class UserInfo {
    constructor({userName, userAbout}){
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }

    getUserInfo(){
      this._userInfo = {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
        }
        return this._userInfo;
    }

    setUserInfo(data){
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
    }
}

export {UserInfo};