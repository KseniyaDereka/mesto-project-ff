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
  if(isLikedByMe(item, myId)){
    likeCardButton.classList.add("card__like-button_is-active");
  } else {
    likeCardButton.classList.remove("card__like-button_is-active");
  }
  if (myId !== item.owner._id) {
    deleteCardButton.remove();
  }
  deleteCardButton.addEventListener("click", () => {
    handleDeleteCard(deleteCardButton, ".card", cardId);
  });

  likeCardButton.addEventListener("click", () => {
    if(isLikedByMe(item, myId)){
      handleDeleteLike(likeCardButton, "card__like-button_is-active", cardId, likeCounter);
    }
    else {
   handlePutLike(likeCardButton, "card__like-button_is-active", cardId, likeCounter);
  }
  });

  cardImage.addEventListener("click", handleZoomImage);
  
  return card;
}

function handleDeleteCard(button, classname, id) {
  const cardParent = button.closest(classname);
  cardParent.remove();
  deleteCard(id)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
}

function isLikedByMe(cardData, ownerId){
  if(cardData.likes.filter((like) => { return like._id == ownerId}).length){
    return true;
  } 
}

function handlePutLike(button, classname, id, counter) {
  putLike(id)
    .then((cardData) => { button.classList.add(classname);
      counter.textContent = cardData.likes.length;
})
    .catch((error) => {
      console.log(error);
    });    
}

function handleDeleteLike(button, classname, id, counter) {
  deleteLike(id)
    .then((cardData) => { button.classList.remove(classname);
      counter.textContent = cardData.likes.length; 
    })
    .catch((error) => {
      console.log(error);
    });    
}


export { createCard, handleDeleteCard, handlePutLike, handleDeleteLike };
