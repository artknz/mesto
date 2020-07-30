import {initialCards, togglePopup, config, onDisableButton} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const cardTemplateSelector = '.elements-template';

const titleInput = document.querySelector('.popup__field_type_title');
const linkInput = document.querySelector('.popup__field_type_link');

//Открытие попапа и добавление текста со страницы в форму
const addInputText = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;

  togglePopup(editProfilePopup)
};

// Обработчик отправки формы редактирования профиля
function handlerEditFormSubmit (evt) {
    evt.preventDefault();

    const nameInputItem = nameInput.value;
    const jobInputItem = jobInput.value;

    profileName.textContent = nameInputItem;
    profileStatus.textContent = jobInputItem;

    togglePopup(editProfilePopup);
}

//Обработчик отправки формы добавления карточек
function handlerAddFormSubmit (evt) {
  evt.preventDefault();
  const buttonElement = addCardPopup.querySelector(config.submitButtonSelector);

  const titleInputItem = titleInput.value;
  const linkInputItem = linkInput.value;

  const inputData = {
    name: titleInputItem,
    link: linkInputItem
  };

  const card = new Card(inputData, cardTemplateSelector);
  const element = card.generateCard();

  initialCardsElement.prepend(element);
  togglePopup(addCardPopup);
  onDisableButton(buttonElement, config.inactiveButtonClass);
  formAdd.reset();
}

// Слушатели событий
popupEditOpenButton.addEventListener('click', () => addInputText(editProfilePopup));
popupEditCloseButton.addEventListener('click', () => togglePopup(editProfilePopup));

formEdit.addEventListener('submit', handlerEditFormSubmit);

addButtonElement.addEventListener('click', () => togglePopup(addCardPopup));
closeButtonCards.addEventListener('click', () => togglePopup(addCardPopup));
formAdd.addEventListener('submit', handlerAddFormSubmit);

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector);
  const element = card.generateCard();

  initialCardsElement.prepend(element);
});

const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();
