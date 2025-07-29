import { nameIsValid } from '../src/app'

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
