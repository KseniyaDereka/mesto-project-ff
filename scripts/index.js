// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
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


//переменные для редактирования профиля 
const editForm = document.forms.editProfile;
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.info;
const profileName = document.querySelector(".profile__nickname");
const userInfo = document.querySelector(".profile__user-information");
//Функции попапов


function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closeByOverlayClick);
}


function closeByEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closePopup(popup);
    }
  }


  function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  }
  
//функции для попапа редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    userInfo.textContent = job;
    closePopup(popupEditProfile);
  }



//слушатели
openEditPopup.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

openAddPopup.addEventListener("click", () => {
  openPopup(popupAddCard);
});

closeEditPopup.addEventListener("click", () => {
    closePopup(popupEditProfile);
  });

closeAddPopup.addEventListener("click", () => {
    closePopup(popupAddCard);
  });

//closeZoomPopup.addEventListener("click", () => {
    //closePopup(popupZoomImage);
  //});

editForm.addEventListener("submit", handleFormSubmit);
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(item, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteCardButton = card.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteCardButton.addEventListener("click", () => {
    deleteCard(deleteCardButton, ".card");
  });

  return card;
}

function deleteCard(button, selector) {
  const cardParent = button.closest(selector);
  cardParent.remove();
}

function renderCards(item) {
  const newCard = createCard(item, deleteCard);
  const cardContainer = document.querySelector(".places__list");
  cardContainer.append(newCard);
}

initialCards.forEach((item) => {
  renderCards(item);
});
