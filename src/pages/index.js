import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
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
import '../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '6492f791-b5eb-4368-9c1b-0fccf5018796',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards().then(item => {
  const renderCard = item => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    },
    cardsTemplateElement);
    cardList.addItem(card.generateCard());
  }

  //Добавление карточек
  const cardList = new Section({
    items: item,
    renderer: renderCard,
    }, initialCardsElement);

  cardList.renderItems();

  //Попап AddCard
  const addNewCard = new PopupWithForm({
    popupSelector: addCardPopup,
    handleFormSubmit: renderCard,
  })
  //Слушатели AddCard
  addNewCard.setEventListeners();
  addButtonElement.addEventListener('click', () => addNewCard.open());
})

api.getUserInfo().then(data => {

  //Попап Profile
  const userData = new UserInfo(profileName, profileStatus);
  userData.setUserInfo(data);

  const popupProfile = new PopupWithForm({
    popupSelector: editProfilePopup,
    handleFormSubmit: (data) => userData.setUserInfo(data)
  });

  popupProfile.setEventListeners();

  popupEditOpenButton.addEventListener('click', () => {
    const profileInfo = userData.getUserInfo();

    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.about;
    popupProfile.open();
  });
})

//Попап Image
const popupImage = new PopupWithImage(imagePopup);

//Валидация
const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();
