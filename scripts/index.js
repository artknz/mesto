// Константы и переменные
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_status');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.popup__container');

// Обработчик открытия и закрытия попапа и заполнения полей формы
const popupToggle = function () {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')){
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
  }
}

// Обработчик отправки формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputItem = nameInput.value;
    let jobInputItem = jobInput.value;

    profileName.textContent = nameInputItem;
    profileStatus.textContent = jobInputItem;

    popupToggle()
}
// Регистраторы событий
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [{
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initialCardsElement = document.querySelector('.elements');
const addButtonElement = document.querySelector('.profile__add-button');
const cardsTemplateElement = document.querySelector('.elements-template');

function addCard(item) {
  const element = cardsTemplateElement.content.cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__text').textContent = item.name;
  element.querySelector('.element__image').alt = item.name;

  initialCardsElement.prepend(element);
}

initialCards.forEach(item =>{
  addCard(item);
});

addButtonElement.addEventListener('click', popupToggle);
