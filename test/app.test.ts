import { fullTrim, getTotal, nameIsValid } from '../src/app'

describe('nameIsValid function', () => {
  it('should return a true check the string of small letters', () => {
    const result = nameIsValid('user')
    expect(result).toBe(true)
  })

  it('should return a false check the string of big and small letters', () => {
    const result = nameIsValid('User')
    expect(result).toBe(false)
  })

  it('should return a false check the string of small letters with a number', () => {
    const result = nameIsValid('user1')
    expect(result).toBe(false)
  })
})

test.each`
  text                     | expected
  ${`Hello world!`}        | ${`Helloworld!`}
  ${`Hello      world!`}   | ${`Helloworld!`}
  ${` Hello      world! `} | ${`Helloworld!`}
`('returns $expected when $text', ({ text, expected }) => {
  expect(fullTrim(text)).toEqual(expected)
})

describe('getTotal function', () => {
  it('should return order amount with discount 1', () => {
    const result = getTotal([{ price: 10, quantity: 10 }], 1)
    expect(result).toBe(99)
  })

  it('should return order amount with discount 0', () => {
    const result = getTotal([{ price: 10, quantity: 10 }])
    expect(result).toBe(100)
  })

  it('should return error if discount not a number', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], `не число`)).toThrow('Скидка должна быть числом')
  })

  it('should return error if discount < 0', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -1)).toThrow('Процент скидки должен быть от 0 до 99')
  })

  it('should return error if discount > 99', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], 100)).toThrow('Процент скидки должен быть от 0 до 99')
  })
})
