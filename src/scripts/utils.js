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

//Переменные попапа картинки
export const imagePopup = document.querySelector('.popup_image');
export const imageCapture = document.querySelector('.popup__capture');
export const imageTitle = document.querySelector('.popup__titile');
export const imagePopupClose = document.querySelector('.popup__close_type_image');

// Обработчик открытия/закрытия попапа и слушатели закрытия по esc/overlay
export const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');

  if(popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener('click', closePopupByOverlay);
  } else {
    document.removeEventListener('keydown', closeEsc);
    popup.removeEventListener('click', closePopupByOverlay);
  }
}

//Функция закрытия попапов клавишей esc
function closeEsc (e) {
  if (e.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_opened');
    togglePopup(openedPopup);
  }
}

//Функция закрытия попапов по клику на overlay
const closePopupByOverlay = function (e) {
  if (event.target === event.currentTarget) {
    const openedOverlay = document.querySelector('.popup_opened');
    togglePopup(openedOverlay);
  }
};

//Закрытие попапа картинки
imagePopupClose.addEventListener('click', () => togglePopup(imagePopup));

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
