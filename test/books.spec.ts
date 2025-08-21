import AuthService from '../framework/services/AuthService.ts'
import UserService from '../framework/services/UserService.ts'
import BookService from '../framework/services/BookService.ts'
// @ts-expect-error TS(2732): Cannot find module '../framework/fixtures/Books.js... Remove this comment to see the full error message
import { books } from '../framework/fixtures/Books.json'
//import configBookstore from '../framework/config/configBookstore'
import { generateUserCredentials } from '../framework/fixtures/userFixture.ts'

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Add book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1] = books
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const isbn1 = book1.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const responseAddListOfBooks = await BookService.addList(userId, collectionOfIsbns, token)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseAddListOfBooks.data.books).toEqual(collectionOfIsbns)
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Replace book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1, book2] = books
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const isbn1 = book1.isbn
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const isbn2 = book2.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  await BookService.addList(userId, collectionOfIsbns, token)
  const responseReplaceBook = await BookService.replace(userId, isbn1, isbn2, token)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseReplaceBook.data).toEqual({
    books: [book2],
    userId,
    username: newUser.userName
  })
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Get information about book`, async () => {
  const [book1] = books
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const isbn1 = book1.isbn
  const responseGetBook = await BookService.getBook(isbn1)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseGetBook.data.isbn).toBe(isbn1)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseGetBook.data.title).toEqual('Git Pocket Guide')
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test(`Delete book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1] = books
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  const isbn1 = book1.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-expect-error 
  await BookService.addList(userId, collectionOfIsbns, token)
  const responseRemove = await BookService.removeBooks(userId, isbn1, token)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseRemove.status).toBe(204)
  const responseUser = await UserService.get(userId, token)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(responseUser.data).toHaveProperty(`books`, [])
})
