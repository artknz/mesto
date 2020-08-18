import {imageCapture, imageTitle} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = imageCapture;
    this._popupTitle = imageTitle;
  }

open({name, link}) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupTitle.alt = name;
    super.open();
  }
}
