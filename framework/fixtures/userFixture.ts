import { faker } from '@faker-js/faker'

export const generateUserCredentials = () => {
  return {
    userName: faker.internet.username(),
    password: `Password!123`
  }
}

export const generateUncorrectUserCredentials = () => {
  return {
    userName: faker.internet.username(),
    password: `Pass`
  }
}
