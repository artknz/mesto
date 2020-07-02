// Константы и переменные
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close_type_profile');

const editProfilePopup = document.querySelector('.popup_profile');
const addCardPopup = document.querySelector('.popup_addcard');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_status');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.popup_container_type_edit');

// Обработчик открытия и закрытия попапа и заполнения полей формы
const popupToggle = function(popup) {
  popup.classList.toggle('popup_opened');
}

//Добавление текста со старницы в форму
const addInputText = function() {
  if (popup.classList.contains('popup_opened')){
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
  }
}

// Обработчик отправки формы редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputItem = nameInput.value;
    let jobInputItem = jobInput.value;

    profileName.textContent = nameInputItem;
    profileStatus.textContent = jobInputItem;

    popupToggle(editProfilePopup);
}

// Регистраторы событий
popupOpenButton.addEventListener('click', () => popupToggle(editProfilePopup));
popupOpenButton.addEventListener('click', () => addInputText(editProfilePopup));
popupCloseButton.addEventListener('click', () => popupToggle(editProfilePopup));

formElement.addEventListener('submit', formSubmitHandler);

//Массив с начальными картинками
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
const closeButtonCards = document.querySelector('.popup__close_type_cards');
const cardsTemplateElement = document.querySelector('.elements-template');

let titleInput = document.querySelector('.popup__field_type_title');
let linkInput = document.querySelector('.popup__field_type_link');

let editForm = document.querySelector('.popup__container_type_add');



//Функция добавления карточки
function addCard(item) {
  const element = cardsTemplateElement.content.cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__text').textContent = item.name;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__delete').addEventListener('click', deleteCard);

  initialCardsElement.prepend(element);
}

initialCards.forEach(item =>{
  addCard(item);
});

addButtonElement.addEventListener('click', () => popupToggle(addCardPopup));
closeButtonCards.addEventListener('click', () => popupToggle(addCardPopup));
editForm.addEventListener('submit', formSubmitCard);


//Обработчик отправки формы добавления карточек
function formSubmitCard (evt) {
  evt.preventDefault();

  let titleInputItem = titleInput.value;
  let linkInputItem = linkInput.value;

  let inputData = {
    name: titleInputItem,
    link: linkInputItem
  };

  addCard(inputData);
  popupToggle(addCardPopup);
};

function deleteCard(e) {
  const element = e.target.closest('.element');

  element.remove();
};

const likeButton = document.querySelector('.element__like');

const likeToggle = function() {
  likeButton.classList.toggle('element_liked');
};

likeButton.addEventListener('click', likeToggle);
