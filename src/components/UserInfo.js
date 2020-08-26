export default class UserInfo{
  constructor(userName, userStatus, avatar) {
    this._userName = document.querySelector(userName);
    this._userStatus = document.querySelector(userStatus);
    this._avatar = document.querySelector(avatar);
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

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
