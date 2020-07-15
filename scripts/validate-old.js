//Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

//Функция скрытия ошибики
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = "";
};

//Функция проверки на валидность
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция проверки невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция включения/отключения кнопки submit
const toggleButtonState = (config, inputList) => {
  console.log(hasInvalidInput(inputList));


  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

//Функция добавления обработчиков всем полям форм
const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelectorAll(config.submitButtonSelector);

  toggleButtonState(config, inputList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(config, buttonElement);
    });
  });
};

//Функция добавления обработчиков всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
};

// const config = {
//   formSelector: '.popup__container_form',
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_inactive',
//   inputErrorClass: 'popup__field-error',
//   errorClass: 'popup__field-error_active'
// };

enableValidation({
  formSelector: '.popup__container_form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__field-error_active'
});
