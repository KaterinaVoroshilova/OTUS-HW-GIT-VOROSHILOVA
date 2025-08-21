import config from '../config/configBookstore.ts'

const getUser = async (userId: string, token: string) => {
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

const createUser = async (userName: string, password: string) => {
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

const removeUser = async (userId: string, token: string) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'Response'.
    data: response.data
  }
}

export default {
  get: getUser,
  create: createUser,
  remove: removeUser
}
