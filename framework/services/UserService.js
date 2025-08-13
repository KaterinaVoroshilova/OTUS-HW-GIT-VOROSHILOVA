import config from '../config/configBookstore'

const getUser = async (userId, token) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const createUser = async (userName, password) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const removeUser = async (userId, token) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  get: getUser,
  create: createUser,
  remove: removeUser
}
