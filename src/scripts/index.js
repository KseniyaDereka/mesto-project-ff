import "../pages/index.css";
import {
  createCard,
  handleDeleteCard,
  handlePutLike,
  handleDeleteLike,
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
  editAvatar,
  testAvatarUrl,
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

//переменные для редактирования аватара
const avatarImage = document.querySelector(".profile__image");
const popupAvatarOpenButton = document.querySelector(
  ".profile__avatar-edit-button"
);
const popupAvatarEdit = document.querySelector(".popup-update-avatar");
const popupAvatarEditCloseButton = document.querySelector(
  ".button-close_type_avatar"
);

//переменные для формы редактирования аватара
const formEditAvatarElement = document.forms.updateAvatar;
const avatarLinkInput = formEditAvatarElement.elements.link;

//функция для попапа редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = document.querySelector(".popup__button-edit");
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  userInfo.textContent = job;
  renderLoading(true, submitButtonElement);
  editUserInformation({ name, job }) //вызываю метод/отдаю на сервер данные
    .then((data) => {})
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, submitButtonElement);
    });
  closePopup(popupEditProfile);
}

//функция для попапа обновления аватара
function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = document.querySelector(".popup__button-avatar");
  const avatar = avatarLinkInput.value;
  renderLoading(true, submitButtonElement);
  testAvatarUrl({ avatar })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    });
  avatarImage.src = avatar;
  editAvatar({ avatar })
    .then((data) => {})
    .catch((error) => {
      console.log(error); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, submitButtonElement);
    });

  closePopup(popupAvatarEdit);
}

//функция рендера карточки на страницу
function renderCard(item) {
  const newCard = createCard(
    item,
    handleDeleteCard,
    handlePutLike,
    handleDeleteLike,
    handleZoomImage
  );
  cardContainer.append(newCard);
}

//добавляем свою карточку
function addMyCard(evt) {
  evt.preventDefault();
  const submitButtonElement = document.querySelector(".popup__button-add");
  const name = placeInput.value;
  const link = linkInput.value;
  renderLoading(true, submitButtonElement);
  addCard({ name, link })
    .then((data) => {
      console.log(data);
      renderCard(data);
      closePopup(popupAddCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitButtonElement);
    });
  evt.target.reset();

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

//слушатели для попапа аватара
popupAvatarOpenButton.addEventListener("click", () => {
  openPopup(popupAvatarEdit);
  clearValidation(formEditAvatarElement, configForm);

});

popupAvatarEditCloseButton.addEventListener("click", () => {
  closePopup(popupAvatarEdit);
});

formEditAvatarElement.addEventListener("submit", handleEditAvatarSubmit);

enableValidation(configForm);

//получаем данные пользователя с сервера
getUserInformation()
  .then((userInformation) => {
    //console.log(userInformation);
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

export let myId; //мой айди 0fd2e9b846773c97126418ae
Promise.all(pageData)
  .then(([userInformation, cardMassive]) => {
    myId = userInformation._id; //присваиваю значение
    cardMassive.forEach((item) => {
      renderCard(item);
    }); //вывожу карты с сервера
    profileName.textContent = userInformation.name;
    userInfo.textContent = userInformation.about;
    avatarImage.src = userInformation.avatar;
    console.log(userInformation);
  })
  .catch((error) => {
    console.log(error); // выведем ошибку в консоль
  });

function renderLoading(isLoading, button) { 
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
