import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  initialCardsElement,
  cardsTemplateElement,
  config,
  imagePopup,
  profileName,
  profileStatus,
  profileAvatar,
  editProfilePopup,
  formEdit,
  popupEditOpenButton,
  nameInput,
  jobInput,
  formAdd,
  addCardPopup,
  addButtonElement,
  avatarButtonElement,
  popupAvatar,
  popupDelete
} from '../utils/constants.js';
import '../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '6492f791-b5eb-4368-9c1b-0fccf5018796',
    'Content-Type': 'application/json'
  }
});

let userId

api.getInitialCards().then(item => {

  const deletePopup = new PopupWithDelete(popupDelete);
  deletePopup.setEventListeners();

  const renderCard = item => {
    const card = new Card({
      data: item,
      id: userId,
      handleCardClick: () => {
        popupImage.open(item);
        popupImage.setEventListeners();
      },
      handleDelete: () => {
        deletePopup.open();
        deletePopup.setSubmitHandler(() => {
          api.deleteCard(item._id)
          .then(() => {
            card._deleteCard();
          })
        })
      }
    },
    cardsTemplateElement);
    cardList.addItem(card.generateCard());
  }

  //Начальное добавление карточек
  const cardList = new Section({
    items: item,
    renderer: renderCard,
    }, initialCardsElement);

  cardList.renderItems();

  //Попап AddCard
  const addNewCard = new PopupWithForm({
    popupSelector: addCardPopup,
    handleFormSubmit: (item) => {
      api.addNewCard(item.name, item.link)
      .then((item) => {
        renderCard(item)
      })
    },
  })
  //Слушатели AddCard
  addNewCard.setEventListeners();
  addButtonElement.addEventListener('click', () => addNewCard.open());

  // const deletePopup = new PopupWithDelete({
  //   popupSelector: popupDelete,
  //   handleFormSubmit: () => {
  //     api.deleteCard()
  //   }
  // })

  // deletePopup.setEventListeners();
  // deleteButtonElement.addEventListener('click', () => deletePopup.open());
})

api.getUserInfo().then(data => {
  userId = data._id;

  //Попап Profile
  const userData = new UserInfo(profileName, profileStatus, profileAvatar);
  userData.setUserInfo(data);
  userData.setUserAvatar(data);

  const popupProfile = new PopupWithForm({
    popupSelector: editProfilePopup,
    handleFormSubmit: (data) => {
      api.editUserInfo(data.name, data.about)
      .then(() => {
        userData.setUserInfo(data)
      })
    }
  });

  popupProfile.setEventListeners();

  popupEditOpenButton.addEventListener('click', () => {
    const profileInfo = userData.getUserInfo();

    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.about;
    popupProfile.open();
  });

  const avatarPopup = new PopupWithAvatar({
    popupSelector: popupAvatar,
    handleFormSubmit: (data) => {
      console.log(data)
      api.editUserAvatar(data)
      .then((data) => {
        userData.setUserAvatar(data)
      })
    }
  })

  avatarPopup.setEventListeners();
  avatarButtonElement.addEventListener('click', () => avatarPopup.open())
})

//Попап Image
const popupImage = new PopupWithImage(imagePopup);

//Валидация
const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();
