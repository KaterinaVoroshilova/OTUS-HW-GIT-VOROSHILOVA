import config from '../config/configBookstore'

const getBooks = async () => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Books`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}
const getBook = async isbn => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Book?ISBN=${isbn}`, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}
const replaceBook = async (userId, fromIsbn, isbn, token) => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Books/${fromIsbn}`, {
    method: `PUT`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, isbn })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const addListOfBooks = async (userId, collectionOfIsbns, token) => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Books`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    body: {
      userId,
      collectionOfIsbns
    }
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const removeBooks = async (userId, isbn, token) => {
  const response = await await fetch(`${config.baseURL}/BookStore/v1/Books?UserId=${userId}`, {
    method: `DELETE`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      isbn
    })
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  getBook: getBook,
  getAll: getBooks,
  replace: replaceBook,
  addList: addListOfBooks,
  removeBooks: removeBooks
}
