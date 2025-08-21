import configBookstore from '../framework/config/configBookstore.js'
import { generateUncorrectUserCredentials, generateUserCredentials } from '../framework/fixtures/userFixture.js'
import AuthService from '../framework/services/AuthService.js'
import UserService from '../framework/services/UserService.js'

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`User creation with error, login already in use`, async () => {
  const response = await UserService.create(configBookstore.userName, configBookstore.password)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 406)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.code).toBe(`1204`)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.message).toBe(`User exists!`)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`User creation with error, password does not fit`, async () => {
  const newUser = generateUncorrectUserCredentials()
  const response = await UserService.create(newUser.userName, newUser.password)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 400)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.code).toBe(`1300`)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.message).toBe(
    `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`
  )
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`User creation successful`, async () => {
  const newUser = generateUserCredentials()
  const response = await UserService.create(newUser.userName, newUser.password)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 201)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Token generation with error`, async () => {
  const response = await AuthService.generateToken(configBookstore.userName, configBookstore.uncorrectPass)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 200)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.status).toBe(`Failed`)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.result).toBe('User authorization failed.')
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Token generation successfull`, async () => {
  const response = await AuthService.generateToken(configBookstore.userName, configBookstore.password)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 200)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.status).toBe(`Success`)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data.result).toBe(`User authorized successfully.`)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Authorized successfull`, async () => {
  const response = await AuthService.authorized(configBookstore.userName, configBookstore.password)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 200)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data).toBe(true)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Information about user`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token

  const response = await UserService.get(userId, token)

  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 200)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data).toHaveProperty(`userId`, userId)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response.data).toHaveProperty(`username`, newUser.userName)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Remove user`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token

  const response = await UserService.remove(userId, token)

  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(response).toHaveProperty(`status`, 204)
})
