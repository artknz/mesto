//Функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция скрытия класса с ошибкой
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция проверки валидности поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//Функция проверки массива полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

//Функция добавления обработчиков всем полям формы
const setEventListeners = (formElement, {inputSelector, submitButtonSelector}) =>{
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//Функция добавления обработчиков всем формам
const enableValidation = ({formSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

const config = {
  formSelector: '.popup__container_form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

enableValidation(config);
