// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
;



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
    }
];



function createCard(item, deleteCard){
 const cardTemplate = document.querySelector('#card-template').content;
 const card = cardTemplate.querySelector('.card').cloneNode(true);
 const cardImage = card.querySelector('.card__image');
 const cardTitle = card.querySelector('.card__title');
 const deleteCardButton = card.querySelector('.card__delete-button');

 cardImage.src = item.link;
 cardImage.alt = item.name;
 cardTitle.textContent = item.name;

 deleteCardButton.addEventListener('click', () => { deleteCard(deleteCardButton, '.card') });

return card;

 }

 function deleteCard(button, selector){
    const cardParent = button.closest(selector);
    cardParent.remove();
}

function renderCards(item) {
const newCard = createCard(item, deleteCard);
const cardContainer = document.querySelector('.places__list');
cardContainer.append(newCard);
 }

 initialCards.forEach((item) => {
    renderCards(item);
   });


