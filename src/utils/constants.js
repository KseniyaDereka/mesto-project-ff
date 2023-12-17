//переменные попапов
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupZoomImage = document.querySelector(".popup_type_image");
const popupAvatarEdit = document.querySelector(".popup-update-avatar");
const popupConfirmDelete = document.querySelector(".popup-confirm-delete");

//переменные кнопок
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddCardOpenButton = document.querySelector(".profile__add-button");
const popupProfileCloseButton = document.querySelector(".button-close_type_edit");
const popupAddCardCloseButton = document.querySelector(".button-close_type_add");
const popupZoomCloseButton = document.querySelector(".button-close_type_zoom");
const popupAvatarOpenButton = document.querySelector(".profile__avatar-edit-button");
const popupAvatarEditCloseButton = document.querySelector(".button-close_type_avatar");
// const popupConfirmDeleteOpenButton = document.querySelector(".profile__edit-button");
const popupConfirmDeleteCloseButton = document.querySelector(".button-close_type_confirm");
const popupConfirmDeleteButton = document.querySelector(".popup__button-confirm");
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

//переменные для формы редактирования аватара
const formEditAvatarElement = document.forms.updateAvatar;
const avatarLinkInput = formEditAvatarElement.elements.url;

const configForm = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input_invalid",
    buttonInactiveClass: "popup__button_disabled",
    errorClass: ".error",
  };


export { popupEditProfile, popupAddCard, popupZoomImage, popupAvatarEdit, popupProfileOpenButton,
popupAddCardOpenButton, popupProfileCloseButton, popupAddCardCloseButton, popupZoomCloseButton,
popupAvatarOpenButton, popupAvatarEditCloseButton, formEditElement, nameInput, jobInput, profileName,
userInfo, formAddCardElement, placeInput, linkInput, cardContainer, avatarImage, formEditAvatarElement,
avatarLinkInput, configForm, popupConfirmDelete, popupConfirmDeleteCloseButton, popupConfirmDeleteButton };