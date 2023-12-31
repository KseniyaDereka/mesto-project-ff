const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "7b51863c-93c2-411f-a61e-7d6b9806910b",
    "Content-Type": "application/json",
  },
};

//Токен: 7b51863c-93c2-411f-a61e-7d6b9806910b
//Идентификатор группы: wff-cohort-2

const checkError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
  }
};

//запрос информации пользователя
export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then(checkError);
};

//запрос карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then(checkError);
};

//редактирование информации пользователя
export const editUserInformation = ({ name, job }) => {
  //отредактировать информацию // в name и about попали мои отредактированные данные
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      //берет мой обьект  превращает в строку
      name: name, //сюда попадают мои отредактированные данные
      about: job,
    }),
  }).then(checkError);
};

export const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkError);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(checkError);
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then(checkError);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(checkError);
};

export const editAvatar = ({ avatar }) => {
  //отредактировать информацию // в name и about попали мои отредактированные данные
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      //берет мой обьект  превращает в строку
      avatar: avatar,
    }),
  }).then(checkError);
};

export const testAvatarUrl = ({ avatar }) => {
  return fetch(avatar, {
    method: "HEAD",
  })
    .then(checkError)
    .then((res) => {
      return res.headers.get("content-type");
    });
};
