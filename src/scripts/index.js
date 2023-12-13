import "../pages/index.css";
import { popupEditProfile, popupAddCard, popupZoomImage, popupAvatarEdit, popupProfileOpenButton,
  popupAddCardOpenButton, popupProfileCloseButton, popupAddCardCloseButton, popupZoomCloseButton,
  popupAvatarOpenButton, popupAvatarEditCloseButton, formEditElement, nameInput, jobInput, profileName,
  userInfo, formAddCardElement, placeInput, linkInput, cardContainer, avatarImage, formEditAvatarElement,
  avatarLinkInput } from "../utils/constants.js";
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



//функция для попапа редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = document.querySelector(".popup__button-edit");
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  userInfo.textContent = job;
  renderLoading(true, submitButtonElement);
  editUserInformation({ name, job })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
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
      if(data == 'image/jpeg'|| data == 'image/png' || data == 'image/gif') {
        console.log(data + " - правильный формат");
      } else {
       return Promise.reject("Ошибка");
      };
    })
    .then(() => { avatarImage.src = avatar; 
      return editAvatar({ avatar }); })
    .then((data) => { console.log(data) })
    .catch((error) => {
      if (error == "Ошибка") {
        console.log("Некорректный формат изображения, используйте jpg, png или gif"); // выведем ошибку в консоль
      } else {
        console.log(error);
      }
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
  cardContainer.prepend(newCard);
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

//функция заполнения данными профиля из инпутов
function setUserInfo() {
  const name = profileName.textContent;
  const job = userInfo.textContent;
  nameInput.value = name;
  jobInput.value = job;
}

//включаем валидацию
enableValidation(configForm);


// API
//получаем данные пользователя с сервера
getUserInformation()
  .then((userInformation) => {
  })
  .catch((error) => {
    console.log("Ошибка запроса информации пользователя", error); // выведем ошибку в консоль
  });

//получаем карточки с сервера
getCards()
  .then((cardMassive) => {
  })
  .catch((error) => {
    console.log("Ошибка запроса карточек пользователя", error); // выведем ошибку в консоль
  });

const pageData = [getUserInformation(), getCards()];

export let myId;
 //мой айди 0fd2e9b846773c97126418ae

Promise.all(pageData)
  .then(([userInformation, cardMassive]) => {
    myId = userInformation._id;
    cardMassive.reverse();
    cardMassive.forEach((item) => {
      renderCard(item);
    });
    profileName.textContent = userInformation.name;
    userInfo.textContent = userInformation.about;
    avatarImage.src = userInformation.avatar;
    console.log(userInformation);
  })
  .catch((error) => {
    console.log(error);
  });

  //функция смены надписи кнопки при сохранении
function renderLoading(isLoading, button) { 
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//слушатели-обработчики
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