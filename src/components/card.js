function createCard(item, handleDeleteCard, handleCardLike, handleZoomImage) {
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

  deleteCardButton.addEventListener("click", () => {
    handleDeleteCard(deleteCardButton, ".card");
  });

  likeCardButton.addEventListener("click", () => {
    handleCardLike(likeCardButton, "card__like-button_is-active");
  });

  cardImage.addEventListener("click", handleZoomImage);

  return card;
}

function handleDeleteCard(button, selector) {
  const cardParent = button.closest(selector);
  cardParent.remove();
}

function handleCardLike(button, selector) {
  button.classList.toggle(selector);
}

export { createCard, handleDeleteCard, handleCardLike };
