import {imagePopup, imageCapture, imageTitle, togglePopup} from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)

    return cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardText = this._cardElement.querySelector('.element__text');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    this._cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  // Удаление карточки
  _deleteCard(e) {
    e.target.closest('.element').remove();
  }

  //Лайк карточки
  _likeCard(e) {
    e.target.closest('.element__like').classList.toggle('element_liked');
  }

  //Открытие попапа картинки
  _handleOpenPopup() {
      imageCapture.src = this._cardImage.src;
      imageCapture.alt = this._cardImage.alt;
      imageTitle.textContent = this._cardImage.alt;
      togglePopup(imagePopup);
  }
}
