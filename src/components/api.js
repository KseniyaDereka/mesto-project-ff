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