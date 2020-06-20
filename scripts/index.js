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
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
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
