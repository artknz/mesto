import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
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

Promise.all([ api.getInitialCards(), api.getUserInfo() ])
  .then((result) => {
    const [item, data] = result

  const deletePopup = new PopupWithDelete(popupDelete);
  deletePopup.setEventListeners();

  const renderCard = item => {
    const card = new Card({
      data: item,
      id: data._id,
      handleCardClick: () => {
        popupImage.open(item);
      },
      handleDelete: () => {
        deletePopup.open();
        deletePopup.setSubmitHandler(() => {
          renderLoading(true, popupDelete)
          api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
          })
          .then(() => {
            deletePopup.close()
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
      .then(()=> {
        addNewCard.close()
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
      .then(() => {
        popupProfile.close()
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

  const avatarPopup = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (data) => {
      renderLoading(true, popupAvatar)
      api.editUserAvatar(data.avatar)
      .then(() => {
        userData.setUserAvatar(data)
      })
      .then(() => {
        avatarPopup.close()
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
popupImage.setEventListeners();

//Валидация
const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation();

const renderLoading = (loading, popupSelector) => {
  const activePopup = document.querySelector(popupSelector);
  const loadingButton = activePopup.querySelector('.popup__save');

  loadingButton.textContent = loading ? 'Сохраняется...' : 'Сохранить';
}
