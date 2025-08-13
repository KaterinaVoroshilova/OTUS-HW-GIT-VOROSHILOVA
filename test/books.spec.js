import AuthService from '../framework/services/AuthService'
import UserService from '../framework/services/UserService'
import BookService from '../framework/services/BookService'
import { books } from '../framework/fixtures/Books.json'
//import configBookstore from '../framework/config/configBookstore'
import { generateUserCredentials } from '../framework/fixtures/userFixture'

test(`Add book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1] = books
  const isbn1 = book1.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  const responseAddListOfBooks = await BookService.addList(userId, collectionOfIsbns, token)
  expect(responseAddListOfBooks.data.books).toEqual(collectionOfIsbns)
})

test(`Replace book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1, book2] = books
  const isbn1 = book1.isbn
  const isbn2 = book2.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  await BookService.addList(userId, collectionOfIsbns, token)
  const responseReplaceBook = await BookService.replace(userId, isbn1, isbn2, token)
  expect(responseReplaceBook.data).toEqual({
    books: [book2],
    userId,
    username: newUser.userName
  })
})

test(`Get information about book`, async () => {
  const [book1] = books
  const isbn1 = book1.isbn
  const responseGetBook = await BookService.getBook(isbn1)
  expect(responseGetBook.data.isbn).toBe(isbn1)
  expect(responseGetBook.data.title).toEqual('Git Pocket Guide')
})

test(`Delete book`, async () => {
  const newUser = generateUserCredentials()
  const responseCreate = await UserService.create(newUser.userName, newUser.password)
  const responseGenerate = await AuthService.generateToken(newUser.userName, newUser.password)
  await AuthService.authorized(newUser.userName, newUser.password)
  const userId = responseCreate.data.userID
  const token = responseGenerate.data.token
  const [book1] = books
  const isbn1 = book1.isbn
  const collectionOfIsbns = [{ isbn: isbn1 }]
  await BookService.addList(userId, collectionOfIsbns, token)
  const responseRemove = await BookService.removeBooks(userId, isbn1, token)
  expect(responseRemove.status).toBe(204)
  const responseUser = await UserService.get(userId, token)
  expect(responseUser.data).toHaveProperty(`books`, [])
})
