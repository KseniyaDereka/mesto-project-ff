import { myId } from "../scripts/index.js";
import { deleteCard, putLike, deleteLike } from "./api.js";
function createCard(item, handleDeleteCard, handlePutLike, handleDeleteLike, handleZoomImage) {
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
  //console.log(item.likes.length);
  //console.log(item._id);
  if (myId !== item.owner._id) {
    deleteCardButton.remove();
  }
  deleteCardButton.addEventListener("click", () => {
    handleDeleteCard(deleteCardButton, ".card", cardId);
  });

  likeCardButton.addEventListener("click", () => {
  // console.log(item);
  // console.log(item.likes.filter(l => l._id == myId));
    if(item.likes.filter((like) => { return like._id == myId}).length){
      console.log("поставила лайк");
      handleDeleteLike(likeCardButton, "card__like-button_is-active", cardId);
    }
    else {
   console.log("убрала лайк");
   handlePutLike(likeCardButton, "card__like-button_is-active", cardId);
  }
  
  });

  cardImage.addEventListener("click", handleZoomImage);

  return card;
}

function handleDeleteCard(button, selector, id) {
  const cardParent = button.closest(selector);
  cardParent.remove();
  deleteCard(id)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
}

function handlePutLike(button, selector, id) {
  putLike(id)
    .then((res) => button.classList.add(selector)
    )
    .catch((error) => {
      console.log(error);
    });    
}

function handleDeleteLike(button, selector, id) {
  deleteLike(id)
    .then((res) => { button.classList.remove(selector) }
    )
    .catch((error) => {
      console.log(error);
    });    
}


export { createCard, handleDeleteCard, handlePutLike, handleDeleteLike };
