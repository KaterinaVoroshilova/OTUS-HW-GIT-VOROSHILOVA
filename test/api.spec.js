import { faker } from '@faker-js/faker'

test(`User creation with error, login already in use`, async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      userName: `user`,
      password: `Pass!123`
    })
  })
  const responseBody = await response.json()
  expect(response.status).toEqual(406)
  expect(responseBody).toEqual({
    code: `1204`,
    message: `User exists!`
  })
})

test(`User creation with error, password does not fit`, async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      userName: faker.internet.username(),
      password: `pass`
    })
  })
  const responseBody = await response.json()
  expect(response.status).toEqual(400)
  expect(responseBody).toEqual({
    code: `1300`,
    message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`
  })
})

test(`User creation successful`, async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      userName: faker.internet.username(),
      password: `Password!123`
    })
  })
  expect(response.status).toEqual(201)
})

test(`Token generation with error`, async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      userName: `user`,
      password: `pass`
    })
  })
  const responseBody = await response.json()
  expect(response.status).toEqual(200)
  expect(responseBody).toEqual({
    token: null,
    expires: null,
    status: 'Failed',
    result: 'User authorization failed.'
  })
})

test(`Token generation successfull`, async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      userName: `user`,
      password: `Pass!123`
    })
  })
  const responseBody = await response.json()
  expect(response.status).toEqual(200)
  expect(responseBody.status).toEqual(`Success`)
  expect(responseBody.result).toEqual(`User authorized successfully.`)
})
