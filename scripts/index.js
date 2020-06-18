const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-button_type_open')
const popupCloseButton = popup.querySelector('.popup__close')

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_status');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.popup__container');

const popupAdd = function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

const popupRemove = function () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputItem = nameInput.value;
    let jobInputItem = jobInput.value;

    profileName.textContent = nameInputItem;
    profileStatus.textContent = jobInputItem;

    popupRemove()
}

popupOpenButton.addEventListener('click', popupAdd);
popupCloseButton.addEventListener('click', popupRemove);

formElement.addEventListener('submit', formSubmitHandler);
