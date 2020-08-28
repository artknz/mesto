export default class Card {
  constructor({data, id, handleCardClick, handleDelete, handleLike}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = id;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleDelete = handleDelete;
    this.handleLike = handleLike;
  }

  _getLikesCount() {
    return this._likes.length
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    if(this.isLiked()) {
      this._cardLikes.textContent = this._likes.length;
    } else {
      this._cardLikes.textContent = this._likes.length;
    }
    this._likeCard()
  }

  isLiked() {
      return !!this._likes.find(like => like._id === this._userId);
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
    this._cardLike = this._cardElement.querySelector('.element__like');
    this._cardLikes = this._cardElement.querySelector('.element__like-count');
    this._cardDelete = this._cardElement.querySelector('.element__delete')
    if (this._ownerId !== this._userId) {
      this._cardDelete.classList.add('element__delete_true')
    }
    if(this.isLiked()) {
      this._cardLike.classList.add('element_liked');
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._cardLikes.textContent = this._getLikesCount();
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', this.handleDelete);
    this._cardElement.querySelector('.element__like').addEventListener('click', this.handleLike);
    this._cardElement.querySelector('.element__image').addEventListener('click', this.handleCardClick);
  }

  // Удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }

  //Лайк карточки
  _likeCard() {
    this._cardElement.querySelector('.element__like').classList.toggle('element_liked');
  }
}
