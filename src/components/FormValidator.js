import {onDisableButton, offDisableButton} from '../utils/constants.js';

export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  //Функция добавления класса с ошибкой
  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Функция скрытия класса с ошибкой
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Функция проверки валидности поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  //Функция переключения кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      onDisableButton(buttonElement, this._inactiveButtonClass);
    } else {
      offDisableButton(buttonElement, this._inactiveButtonClass);
    }
  }

  //Функция добавления обработчиков всем полям формы
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      });
    });
  }

    //Функция проверки массива полей на валидность
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }

    //Функция добавления обработчиков всем формам
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
