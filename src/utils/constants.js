//Массив с начальными картинками
export const initialCards = [{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
},
{
  name: 'Приморье',
  link: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2019-07/RIAN_5610933.HR_.ru_.jpg'
},
{
  name: 'Камчатка',
  link: 'https://www.tripzaza.com/ru/destinations/files/2018/09/1-The_Valley_of_Geysers-e1549341062455.jpg'
},
{
  name: 'Ейский лиман',
  link: 'https://i.pinimg.com/originals/d3/8e/1b/d38e1b9416a466adfb409d5725ea676d.jpg'
},
{
  name: 'Башкирия',
  link: 'https://samovar.travel/upload/resize_cache/iblock/45a/45ab924d49c204cad5ca22720d1dfe06/767_575_2/1497.jpg'
},
{
  name: 'Сахалин',
  link: 'https://undergroundexpert.info/wp-content/uploads/2017/11/sahalin-foto925.png'
}
];

//Переменные
export const imagePopup = '.popup_image';
export const imageCapture = document.querySelector('.popup__capture');
export const imageTitle = document.querySelector('.popup__titile');
export const imagePopupClose = document.querySelector('.popup__close_type_image');

export const titleInput = document.querySelector('.popup__field_type_title');
export const linkInput = document.querySelector('.popup__field_type_link');

export const initialCardsElement = '.elements';
export const cardsTemplateElement = '.elements-template';

export const profileName = '.profile__name';
export const profileStatus = '.profile__status';

export const editProfilePopup = '.popup_profile';
export const formEdit = document.querySelector('.popup_container_type_edit');
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__field_type_name');
export const jobInput = document.querySelector('.popup__field_type_status');

export const formAdd = document.querySelector('.popup__container_type_add');
export const addCardPopup = '.popup_addcard';
export const addButtonElement = document.querySelector('.profile__add-button');

export const config = {
  formSelector: '.popup__container_form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

//Включение/отключение кнопки submit
export const onDisableButton = function (buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

export const offDisableButton = function (buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}
