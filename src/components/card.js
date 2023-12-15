import { deleteCard, putLike, deleteLike } from "./api.js";
function createCard(
  item,
  handleDeleteCard,
  handleZoomImage,
  myId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteCardButton = card.querySelector(".card__delete-button");
  const likeCardButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCounter.textContent = item.likes.length;
  const cardId = item._id;
  if (isLikedByMe(item, myId)) {
    likeCardButton.classList.add("card__like-button_is-active");
  }
  if (myId !== item.owner._id) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener("click", () => {
      handleDeleteCard(deleteCardButton, ".card", cardId);
    });
  }

  likeCardButton.addEventListener("click", () => {
    const likeMethod = likeCardButton.classList.contains(
      "card__like-button_is-active"
    )
      ? deleteLike
      : putLike;
    likeMethod(cardId)
      .then((cardData) => {
        likeCardButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  });
  cardImage.addEventListener("click", handleZoomImage);

  return card;
}

function handleDeleteCard(button, classname, id) {
  const cardParent = button.closest(classname);
  deleteCard(id)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
  cardParent.remove();
}

function isLikedByMe(cardData, ownerId) {
  return cardData.likes.some((like) => {
    return like._id == ownerId;
  });
}

export { createCard, handleDeleteCard };
