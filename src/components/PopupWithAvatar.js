import Popup from './Popup.js';

export default class PopupWithAvatar extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._input = this._popup.querySelector('.popup__field');
  }

  setUserAvatar() {
    this._avatar.src = this._input.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._input.value);
      this.close();
    })
  }
}
