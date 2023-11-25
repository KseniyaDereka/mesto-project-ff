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
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddCardOpenButton = document.querySelector(".profile__add-button");
const popupProfileCloseButton = document.querySelector(".button-close_type_edit");
const popupAddCardCloseButton = document.querySelector(".button-close_type_add");
const popupZoomCloseButton = document.querySelector(".button-close_type_zoom");

//переменные для формы редактирования профиля
const formEditElement = document.forms.editProfile;
const nameInput = formEditElement.elements.name;
const jobInput = formEditElement.elements.info;
//переменные для редактирования профиля
const profileName = document.querySelector(".profile__nickname");
const userInfo = document.querySelector(".profile__user-information");

//переменные для формы попапа добавления карточек
const formAddCardElement = document.forms.newCard;
const placeInput = formAddCardElement.elements.cardTitle;
const linkInput = formAddCardElement.elements.link;

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
popupProfileOpenButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  const name = profileName.textContent;
  const job = userInfo.textContent;
  nameInput.value = name;
  jobInput.value = job;

});

popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

formEditElement.addEventListener("submit", handleEditFormSubmit);

//слушатели для попапа карточки
popupAddCardOpenButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

formAddCardElement.addEventListener("submit", addMyCard);

//слушатели для попапа изображения
popupZoomCloseButton.addEventListener("click", () => {
  closePopup(popupZoomImage);
});
