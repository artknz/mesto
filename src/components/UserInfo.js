export default class UserInfo{
  constructor(userName, userStatus) {
    this._userName = document.querySelector(userName);
    this._userStatus = document.querySelector(userStatus);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.about = this._userStatus.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userStatus.textContent = data.about;
  }
}
