import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards, initialCardsElement, cardsTemplateElement, config, onDisableButton, imagePopup, imageCapture, imageTitle, titleInput, linkInput } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import '../pages/index.css';

//Переменные редактирования профиля
const popupEdit = document.querySelector('.popup');
const editProfilePopup = '.popup_profile';
const formEdit = document.querySelector('.popup_container_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close_type_profile');

const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_status');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

//Переменные добавления карточек
const formAdd = document.querySelector('.popup__container_type_add');

const addCardPopup = '.popup_addcard';
const addButtonElement = document.querySelector('.profile__add-button');
const closeButtonCards = document.querySelector('.popup__close_type_cards');

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

  const card = new Card(inputData, cardsTemplateElement);
  const element = card.generateCard();

  initialCardsElement.prepend(element);
  togglePopup(addCardPopup);
  onDisableButton(buttonElement, config.inactiveButtonClass);
  formAdd.reset();
}

// Слушатели событий
// popupEditOpenButton.addEventListener('click', () => addInputText(editProfilePopup));
// popupEditCloseButton.addEventListener('click', () => togglePopup(editProfilePopup));

// formEdit.addEventListener('submit', handlerEditFormSubmit);

// const openAddCardPopup = new PopupWithForm({
//   popupSelector: addCardPopup,
//   handleFormSubmit: ''
// });
// addButtonElement.addEventListener('click', () => openAddCardPopup.open());

// closeButtonCards.addEventListener('click', () => togglePopup(addCardPopup));
// formAdd.addEventListener('submit', handlerAddFormSubmit);

const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();

//Попап Image
// const popupImage = new PopupWithImage(imagePopup);

//Добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const popupImage = new PopupWithImage(imagePopup);
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    },
    cardsTemplateElement
    );
    const element = card.generateCard();
    cardList.addItem(element);
    },
  },
  initialCardsElement
);

cardList.renderItems();

//Попап Profile
const popupProfile = new PopupWithForm({
  popupSelector: editProfilePopup,
  handleFormSubmit: (item) => {
    const card = new Card(item, cardsTemplateElement);
    const element = card.generateCard();

    cardList.addItem(element);
  }
});

popupProfile.setEventListeners();

popupEditOpenButton.addEventListener('click', () => popupProfile.open());

//Попап AddCard
const addNewCard = new PopupWithForm({
  popupSelector: addCardPopup,
  handleFormSubmit: (item) => {
    const card = new Card(item, cardsTemplateElement);
    const element = card.generateCard();

    cardList.addItem(element);
  }
})

addNewCard.setEventListeners();
addButtonElement.addEventListener('click', () => addNewCard.open());
