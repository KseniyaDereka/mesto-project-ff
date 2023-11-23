import "../pages/index.css";
import { initialCards } from "../components/cardMassive.js";
import {
  createCard,
  handleDeleteCard,
  handleCardLike
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";

//переменные попапов
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupZoomImage = document.querySelector(".popup_type_image");

//переменные кнопок
const editPopupOpenButton = document.querySelector(".profile__edit-button");
const addPopupOpenButton = document.querySelector(".profile__add-button");
const editPopupCloseButton = document.querySelector(".button-close_type_edit");
const addPopupCloseButton = document.querySelector(".button-close_type_add");
const zoomPopupCloseButton = document.querySelector(".button-close_type_zoom");

//переменные для формы редактирования профиля
const editFormElement = document.forms.editProfile;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.info;
//переменные для редактирования профиля
const profileName = document.querySelector(".profile__nickname");
const userInfo = document.querySelector(".profile__user-information");

//переменные для формы попапа добавления карточек
const addFormElement = document.forms.newCard;
const placeInput = addFormElement.elements.cardTitle;
const linkInput = addFormElement.elements.link;

//переменные для попапа добавления карточек
const cardContainer = document.querySelector(".places__list");

//функции для попапа редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  userInfo.textContent = job;
  closePopup(popupEditProfile);
}

//функция рендера карточки на страницу
function renderCard(item) {
  const newCard = createCard(
    item,
    handleDeleteCard,
    handleCardLike,
    handleZoomImage
  );
  cardContainer.prepend(newCard);
}

//рендерим массив на страницу
initialCards.forEach((item) => {
  renderCard(item);
});

//добавляем свою карточку
function addMyCard(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  closePopup(popupAddCard);
  renderCard({ name: name, link: link });
  evt.target.reset();
}

//функция увеличения изображения по клику
function handleZoomImage(evt) {
  openPopup(popupZoomImage);
  const imageZoomed = popupZoomImage.querySelector(".popup__image");
  const imageCaption = popupZoomImage.querySelector(".popup__caption");
  const img = evt.target;
  imageZoomed.src = img.src;
  imageZoomed.alt = img.alt;
  imageCaption.textContent = imageZoomed.alt;
}

//слушатели для попапа редактирования
editPopupOpenButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  const name = profileName.textContent;
  const job = userInfo.textContent;
  nameInput.value = name;
  jobInput.value = job;

});

editPopupCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

//слушатели для попапа карточки
addPopupOpenButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

addPopupCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

addFormElement.addEventListener("submit", addMyCard);

//слушатели для попапа изображения
zoomPopupCloseButton.addEventListener("click", () => {
  closePopup(popupZoomImage);
});
