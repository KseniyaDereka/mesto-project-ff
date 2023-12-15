//покажи ошибку
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//спрячь ошибку
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}

//проверим валидность
function checkInputValidity(inputElement, formElement, config) {
  const isInputMatchPattern = inputElement.validity.patternMismatch;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isInputMatchPattern) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  const isInputValid = inputElement.validity.valid;
  if (isInputValid) {
    hideError(inputElement, errorElement, config);
  } else {
    showError(inputElement, errorElement, config);
  }
}

function makeButtonUnblocked(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.buttonInactiveClass);
}

function makeButtonBlocked(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.buttonInactiveClass);
}

//блокировка кнопки
function toggleButton(buttonElement, isActive, config) {
  if (isActive) {
    makeButtonUnblocked(buttonElement, config);
  } else {
    makeButtonBlocked(buttonElement, config);
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

//очищаем поля ошибок и  блокируем кнопку
export function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    hideError(inputElement, errorElement, config);
  });
  toggleButton(submitButtonElement, false, config);
}

