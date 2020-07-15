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

const formEdit = document.querySelector('.popup_container_type_edit');

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

formEdit.addEventListener('submit', formSubmitHandler);

const initialCardsElement = document.querySelector('.elements');
const addButtonElement = document.querySelector('.profile__add-button');
const closeButtonCards = document.querySelector('.popup__close_type_cards');
const cardsTemplateElement = document.querySelector('.elements-template');

let titleInput = document.querySelector('.popup__field_type_title');
let linkInput = document.querySelector('.popup__field_type_link');

const formAdd = document.querySelector('.popup__container_type_add');

//Открытие попапа картинки
let imagePopupCapture = document.querySelector('.element__image');
let imagePopupTitile = document.querySelector('.element__text');
let imagePopup = document.querySelector('.popup_image');
let imageCapture = document.querySelector('.popup__capture');
let imageTitle = document.querySelector('.popup__titile');

const imagePopupClose = document.querySelector('.popup__close_type_image');

//Функция добавления карточки
function addCard(item) {
  const element = cardsTemplateElement.content.cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__text').textContent = item.name;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__delete').addEventListener('click', deleteCard);
  element.querySelector('.element__like').addEventListener('click', likeCard);
  element.querySelector('.element__image').addEventListener('click', function(event) {
    let popupImg = event.target.closest('.element__image');

    imageCapture.src = popupImg.src;
    imageCapture.alt = popupImg.alt;
    imageTitle.textContent = popupImg.alt;

    popupToggle(imagePopup);
  });

  initialCardsElement.prepend(element);
}

initialCards.forEach(item =>{
  addCard(item);
});

addButtonElement.addEventListener('click', () => popupToggle(addCardPopup));
closeButtonCards.addEventListener('click', () => popupToggle(addCardPopup));
formAdd.addEventListener('submit', formSubmitCard);

imagePopupClose.addEventListener('click', () => popupToggle(imagePopup));


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
  formAdd.reset();
};

//Функция удаления карточки
function deleteCard(e) {
  const element = e.target.closest('.element');

  element.remove();
};

//Лайк карточки
function likeCard(e) {
  const like = e.target.closest('.element__like');

  like.classList.toggle('element_liked');
};
