import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import {
  initialCards,
  initialCardsElement,
  cardsTemplateElement,
  config,
  imagePopup,
  profileName,
  profileStatus,
  editProfilePopup,
  formEdit,
  popupEditOpenButton,
  nameInput,
  jobInput,
  formAdd,
  addCardPopup,
  addButtonElement
} from '../utils/constants.js';

//Попап Image
const popupImage = new PopupWithImage(imagePopup);

//Добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
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
const userData = new UserInfo(profileName, profileStatus);

const popupProfile = new PopupWithForm({
  popupSelector: editProfilePopup,
  handleFormSubmit: (data) => userData.setUserInfo(data)
});

popupProfile.setEventListeners();

popupEditOpenButton.addEventListener('click', () => {
  const profileInfo = userData.getUserInfo();

  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.status;
  popupProfile.open()
});

//Попап AddCard
const addNewCard = new PopupWithForm({
  popupSelector: addCardPopup,
  handleFormSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    },
    cardsTemplateElement);
    const element = card.generateCard();
    cardList.addItem(element);
  }
})

//Слушатели AddCard
addNewCard.setEventListeners();
addButtonElement.addEventListener('click', () => addNewCard.open());

//Валидация
const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();
