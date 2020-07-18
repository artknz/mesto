//Переменные редактирования профиля
const popupEdit = document.querySelector('.popup');
const editProfilePopup = document.querySelector('.popup_profile');
const formEdit = document.querySelector('.popup_container_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close_type_profile');

const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_status');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

//Переменные добавления карточек
const formAdd = document.querySelector('.popup__container_type_add');

const addCardPopup = document.querySelector('.popup_addcard');
const initialCardsElement = document.querySelector('.elements');
const addButtonElement = document.querySelector('.profile__add-button');
const closeButtonCards = document.querySelector('.popup__close_type_cards');
const cardsTemplateElement = document.querySelector('.elements-template');

const titleInput = document.querySelector('.popup__field_type_title');
const linkInput = document.querySelector('.popup__field_type_link');

//Переменные попапа картинки
const imagePopup = document.querySelector('.popup_image');
const imageCapture = document.querySelector('.popup__capture');
const imageTitle = document.querySelector('.popup__titile');

const imagePopupClose = document.querySelector('.popup__close_type_image');

// Обработчик открытия/закрытия попапа и слушатели закрытия по esc/overlay
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');

  if(popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener('click', closePopupByOverlay);
  } else {
    document.removeEventListener('keydown', closeEsc);
    popup.removeEventListener('click', closePopupByOverlay);
  }
}

//Открытие попапа и добавление текста со страницы в форму
const addInputText = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;

  togglePopup(editProfilePopup)
};

// Обработчик отправки формы редактирования профиля
function handlerEditFormSubmit (evt) {
    evt.preventDefault();

    let nameInputItem = nameInput.value;
    let jobInputItem = jobInput.value;

    profileName.textContent = nameInputItem;
    profileStatus.textContent = jobInputItem;

    togglePopup(editProfilePopup);
}

function renderCard(item) {
  const card = addCard(item);
  initialCardsElement.prepend(card);
}

//Функция добавления карточки
function addCard(item) {
  const element = cardsTemplateElement.content.cloneNode(true);
  const imagePopupCapture = element.querySelector('.element__image');
  const imagePopupTitile = element.querySelector('.element__text');
  const imagePopupDelite = element.querySelector('.element__delete');
  const imagePopupLike = element.querySelector('.element__like');

  imagePopupCapture.src = item.link;
  imagePopupTitile.textContent = item.name;
  imagePopupCapture.alt = item.name;

  imagePopupDelite.addEventListener('click', deleteCard);
  imagePopupLike.addEventListener('click', likeCard);
  imagePopupCapture.addEventListener('click', function(event) {
      imageCapture.src = imagePopupCapture.src;
      imageCapture.alt = imagePopupCapture.alt;
      imageTitle.textContent = imagePopupCapture.alt;
      togglePopup(imagePopup);
    });

  return element;
}

//Обработчик отправки формы добавления карточек
function handlerAddFormSubmit (evt) {
  evt.preventDefault();
  const buttonElement = addCardPopup.querySelector(config.submitButtonSelector);

  let titleInputItem = titleInput.value;
  let linkInputItem = linkInput.value;

  const inputData = {
    name: titleInputItem,
    link: linkInputItem
  };

  renderCard(inputData);
  togglePopup(addCardPopup);
  onDisableButton(buttonElement, config.inactiveButtonClass);
  formAdd.reset();
}

//Функция удаления карточки
function deleteCard(e) {
  const element = e.target.closest('.element');

  element.remove();
}

//Лайк карточки
function likeCard(e) {
  const like = e.target.closest('.element__like');

  like.classList.toggle('element_liked');
}

//Функция закрытия попапов клавишей esc
function closeEsc (e) {
  if (e.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_opened');
    togglePopup(openedPopup);
  }
}

//Функция закрытия попапов по клику на overlay
const closePopupByOverlay = function (e) {
  if (event.target === event.currentTarget) {
    const openedOverlay = document.querySelector('.popup_opened');
    togglePopup(openedOverlay);
  }
};

// Слушатели событий
popupEditOpenButton.addEventListener('click', () => addInputText(editProfilePopup));
popupEditCloseButton.addEventListener('click', () => togglePopup(editProfilePopup));

formEdit.addEventListener('submit', handlerEditFormSubmit);

addButtonElement.addEventListener('click', () => togglePopup(addCardPopup));
closeButtonCards.addEventListener('click', () => togglePopup(addCardPopup));
formAdd.addEventListener('submit', handlerAddFormSubmit);

imagePopupClose.addEventListener('click', () => togglePopup(imagePopup));

initialCards.forEach(item =>{
  renderCard(item);
});
