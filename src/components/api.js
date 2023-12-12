const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '7b51863c-93c2-411f-a61e-7d6b9806910b',
      'Content-Type': 'application/json'
    }
  }


  //getUserInformation
  //Токен: 7b51863c-93c2-411f-a61e-7d6b9806910b
//Идентификатор группы: wff-cohort-2

const checkError = (response) => {
    if (response.ok) {
        return response;
      } else { // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
}

const handleResponse = (response) => {
    return response.json();
  };

//запрос информации пользователя
export const getUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: "GET",
      }).then(checkError)
      .then(handleResponse)
}

//запрос карточек
export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: "GET",
    }).then(checkError)
    .then(handleResponse)
  }

//редактирование информации пользователя
 export const editUserInformation = ({name, job}) => { //отредактировать информацию // в name и about попали мои отредактированные данные
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      method: "PATCH",
      body: JSON.stringify({   //берет мой обьект  превращает в строку
        name: name,  //сюда попадают мои отредактированные данные
        about: job,
      }),
    })
    .then(checkError)
    .then(handleResponse)
  }


export const addCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(checkError)
    .then(handleResponse);
  }


  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
    .then(checkError)
    .then(handleResponse);
  }
