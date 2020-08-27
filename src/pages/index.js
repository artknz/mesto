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

const renderLoading = (loading, popupSelector) => {
  const activePopup = document.querySelector(popupSelector);
  const loadingButton = activePopup.querySelector('.popup__save');

  loadingButton.textContent = loading ? 'Сохраняется...' : 'Сохранить';
}

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
          renderLoading(true, popupDelete)
          api.deleteCard(item._id)
          .then(() => {
            card._deleteCard();
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => renderLoading(false, popupDelete))
        })
      },
      handleLike: () => {
        const isLiked = card.isLiked();
        if(isLiked) {
          api.deleteLikeCard(item._id)
          .then(item => card.updateLikes(item.likes))
          .catch((err) => {console.log(err)})
        } else {
          api.likeCard(item._id)
          .then(item => card.updateLikes(item.likes))
          .catch((err) => {console.log(err)})
        }
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
      renderLoading(true, addCardPopup)
      api.addNewCard(item.name, item.link)
      .then((item) => {
        renderCard(item)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => renderLoading(false, addCardPopup))
    },
  })
  //Слушатели AddCard
  addNewCard.setEventListeners();
  addButtonElement.addEventListener('click', () => addNewCard.open());
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
      renderLoading(true, editProfilePopup)
      api.editUserInfo(data.name, data.about)
      .then(() => {
        userData.setUserInfo(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => renderLoading(false, editProfilePopup))
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
      renderLoading(true, popupAvatar)
      api.editUserAvatar(data)
      .then((data) => {
        userData.setUserAvatar(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => renderLoading(false, popupAvatar))
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
