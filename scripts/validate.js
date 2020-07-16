//Константы
const formElement = document.querySelector('.popup__container_form');
const formInput = formElement.querySelector('.popup__field');

//Функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

//Функция скрытия класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

//Функция проверки валидности поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция проверки массива полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.removeAttribute("disabled");
  }
};

//Функция добавления обработчиков всем полям формы
const setEventListeners = (formElement) =>{
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция добавления обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container_form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

// const config = {
//   formSelector: '.popup__container_form',
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_inactive',
//   inputErrorClass: 'popup__field-error',
//   errorClass: 'popup__field-error_active'
// };



// enableValidation({

// });
