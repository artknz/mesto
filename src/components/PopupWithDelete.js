import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__container');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      if(this._handleFormSubmit) {
        this._handleFormSubmit();
      }
      this.close();
    })
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
}
