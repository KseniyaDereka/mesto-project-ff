//открыть модальное окно
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByOverlayClick);
}

//закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeByOverlayClick);
}

//закрыть модальное окно нажатием на ESC
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

//закрыть модальное окно нажатием на фон
function closeByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup };