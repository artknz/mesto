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
export const profileAvatar = '.profile__avatar-img'

export const editProfilePopup = '.popup_profile';
export const formEdit = document.querySelector('.popup_container_type_edit');
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__field_type_name');
export const jobInput = document.querySelector('.popup__field_type_status');

export const formAdd = document.querySelector('.popup__container_type_add');
export const addCardPopup = '.popup_addcard';
export const addButtonElement = document.querySelector('.profile__add-button');

export const avatarButtonElement = document.querySelector('.profile__avatar');
export const popupAvatar = '.popup_avatar';

export const popupDelete = '.popup_delete';
export const deleteButtonElement = document.querySelector('.element__delete')

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
