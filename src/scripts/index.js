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
const openEditPopup = document.querySelector(".profile__edit-button");
const openAddPopup = document.querySelector(".profile__add-button");
const closeEditPopup = document.querySelector(".button-close_type_edit");
const closeAddPopup = document.querySelector(".button-close_type_add");
const closeZoomPopup = document.querySelector(".button-close_type_zoom");

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

//функции для попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  userInfo.textContent = job;
  closePopup(popupEditProfile);
}

//функция рендера карточки на страницу
function renderCards(item) {
  const newCard = createCard(
    item,
    handleDeleteCard,
    handleCardLike,
    handleZoomImage
  );
  const cardContainer = document.querySelector(".places__list");
  cardContainer.prepend(newCard);
}

//рендерим массив на страницу
initialCards.forEach((item) => {
  renderCards(item);
});

//добавляем свою карточку
function addMyCard(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  closePopup(popupAddCard);
  renderCards({ name: name, link: link });
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
openEditPopup.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

closeEditPopup.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

editFormElement.addEventListener("submit", handleFormSubmit);

//слушатели для попапа карточки
openAddPopup.addEventListener("click", () => {
  openPopup(popupAddCard);
});

closeAddPopup.addEventListener("click", () => {
  closePopup(popupAddCard);
});

addFormElement.addEventListener("submit", addMyCard);

//слушатели для попапа изображения
closeZoomPopup.addEventListener("click", () => {
  closePopup(popupZoomImage);
});
