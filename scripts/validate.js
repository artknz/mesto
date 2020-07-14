//Константы элементов форм


const popupForm = document.querySelector('.popup__container');
const popupField = popupForm.querySelector('.popup__field');
const popupButtonSubmit = popupForm.querySelector('.popup__save');

//Функция показа ошибки
const showInputError = (popupForm, popupField, errorMessage) => {
  const errorElement = popupForm.querySelector(`#${popupField.id}-error`)
  popupField.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

//Функция скрытия ошибики
const hideInputError = (popupForm, popupField,) => {
  const errorElement = popupForm.querySelector(`#${popupField.id}-error`);
  popupField.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = "";
};

//Функция проверки на валидность
const isValid = (popupForm, popupField) => {
  if (!popupField.validity.valid) {
    showInputError(popupForm, popupField, popupField.validationMessage);
  } else {
    hideInputError(popupForm, popupField);
  }
};

//Сброс стандартного поведения формы
popupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
});

//Функция добавления обработчиков всем полям форм
const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__field'));
  toggleButtonState(inputList, popupButtonSubmit);

  inputList.forEach((popupField) => {
    popupField.addEventListener('input', () => {
      isValid(popupForm, popupField);
      toggleButtonState(inputList, popupButtonSubmit);
    });
  });
};

//Функция проверки невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((popupField) => {
    return !popupField.validity.valid;
  });
};

//Функция включения/отключения кнопки submit
const toggleButtonState = (inputList, popupButtonSubmit) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    popupButtonSubmit.classList.add('popup__save_inactive');
    popupButtonSubmit.setAttribute("disabled", true);
  } else {
    popupButtonSubmit.classList.remove('popup__save_inactive');
    popupButtonSubmit.setAttribute("disabled", false);
  };
};

//Функция добавления обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupForm)
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__field-error_active'
});
