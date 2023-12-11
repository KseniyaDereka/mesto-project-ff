import "../pages/index.css";
import {
  createCard,
  handleDeleteCard,
  handleCardLike,
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import {
  configForm,
  enableValidation,
  clearValidation,
  toggleButton,
} from "../components/validation";
import {
  getUserInformation,
  getCards,
  editUserInformation,
  addCard,
} from "../components/api";

//переменные попапов
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupZoomImage = document.querySelector(".popup_type_image");

//переменные кнопок
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddCardOpenButton = document.querySelector(".profile__add-button");
const popupProfileCloseButton = document.querySelector(
  ".button-close_type_edit"
);
const popupAddCardCloseButton = document.querySelector(
  ".button-close_type_add"
);
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
  editUserInformation({ name, job }) //вызываю метод/отдаю на сервер данные
    .then((data) => {})
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    });
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
  cardContainer.append(newCard);
}

//добавляем свою карточку
function addMyCard(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  renderCard({ name: name, link: link });
  addCard(({name, link}))
  .then((data) => {})
  .catch((error) => {
    console.log(error);
  });
  closePopup(popupAddCard);
  evt.target.reset();
  const submitButtonElement = document.querySelector(".popup__button-create");
  toggleButton(submitButtonElement, false, configForm);
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

function setUserInfo() {
  const name = profileName.textContent;
  const job = userInfo.textContent;
  nameInput.value = name;
  jobInput.value = job;
}
//слушатели для попапа редактирования
popupProfileOpenButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  clearValidation(formEditElement, configForm);
  setUserInfo();
});

popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

formEditElement.addEventListener("submit", handleEditFormSubmit);

//слушатели для попапа карточки
popupAddCardOpenButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  clearValidation(formAddCardElement, configForm);
});

popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

formAddCardElement.addEventListener("submit", addMyCard);

//слушатели для попапа изображения
popupZoomCloseButton.addEventListener("click", () => {
  closePopup(popupZoomImage);
});

enableValidation(configForm);

//получаем данные пользователя с сервера
getUserInformation()
  .then((userInformation) => {
    console.log(userInformation);
  })
  .catch((error) => {
    console.log("Ошибка запроса информации пользователя", error); // выведем ошибку в консоль
  });

//получаем карточки с сервера
getCards()
  .then((cardMassive) => {
    console.log(cardMassive);
  })
  .catch((error) => {
    console.log("Ошибка запроса карточек пользователя", error); // выведем ошибку в консоль
  });

const pageData = [getUserInformation(), getCards()];

let ownerId; //мой айди 0fd2e9b846773c97126418ae
Promise.all(pageData)
  .then(([userInformation, cardMassive]) => {
    ownerId = userInformation._id; //присваиваю значение
    cardMassive.forEach((item) => {
      renderCard(item);
    }); //вывожу карты с сервера
    profileName.textContent = userInformation.name;
    userInfo.textContent = userInformation.about;
  })
  .catch((error) => {
    console.log(error); // выведем ошибку в консоль
  });
// const name = nameInput.value;
// const about = jobInput.value;
// console.log(jobInput.value)
