export const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_invalid",
  buttonInactiveClass: "popup__button_disabled",
  errorClass: ".error",
};

//покажи ошибку
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//если все заполнено верно - спрячь
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  //;
}

//проверим валидность
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const isInputMatchPattern = inputElement.validity.patternMismatch;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isInputValid) {
    hideError(inputElement, errorElement, config);
  } else {
    showError(inputElement, errorElement, config);
  }
  if (isInputMatchPattern) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
}

function buttonUnblocked(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.buttonInactiveClass);
}

function buttonBlocked(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.buttonInactiveClass);
}

function toggleButton(buttonElement, isActive, config) {
  if (isActive) {
    buttonUnblocked(buttonElement, config);
  } else {
    buttonBlocked(buttonElement, config);
  }
}

//Вешаем обработчик события submit
function setEventListeners(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );
  toggleButton(submitButtonElement, formElement.checkValidity(), config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      toggleButton(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
}

//Находим все формы и перебираем их
export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  const errors = formElement.querySelectorAll(config.errorClass);
  errors.forEach((error) => {
    error.textContent = "";
  });
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(config.inputErrorClass);
  });

  //inputElement.classList.remove(config.errorClass);
  //errorElement.textContent = '';
}
