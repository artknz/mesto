import Popup from './Popup.js';
import {config, onDisableButton} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._button = this._popup.querySelector(config.submitButtonSelector);
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      onDisableButton(this._button, config.inactiveButtonClass)
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
