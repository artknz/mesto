export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector('.elements-template')
    .content
    .querySelector('.element')
    .cloneNode(true)

    return cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardText = this._cardElement.querySelector('.element__text');
    this._cardClose = this._cardElement.querySelector('.popup__close_type_image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    this._cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    this._cardElement.querySelector('.element__image').addEventListener('click', this.handleCardClick);
  }

  // Удаление карточки
  _deleteCard(e) {
    e.target.closest('.element').remove();
  }

  //Лайк карточки
  _likeCard(e) {
    e.target.closest('.element__like').classList.toggle('element_liked');
  }
}
