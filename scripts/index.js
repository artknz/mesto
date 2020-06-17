const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__open-popup')
const popupCloseButton = popup.querySelector('.popup__close')

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__status');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

const popupAdd = function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent
  jobInput.value = profileStatus.textContent
}

popupOpenButton.addEventListener('click', popupAdd);

const popupRemove = function () {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', popupRemove);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameInput = nameInput.value
    jobInput = jobInput.value

    profileName.textContent = nameInput;
    profileStatus.textContent = jobInput;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popupRemove);
