import { fullTrim, getTotal, nameIsValid } from '../src/app.ts'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('nameIsValid function', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return a true check the string of small letters', () => {
    const result = nameIsValid('user')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(true)
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return a false check the string of big and small letters', () => {
    const result = nameIsValid('User')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(false)
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return a false check the string of small letters with a number', () => {
    const result = nameIsValid('user1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(false)
  })
})

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test.each`
  text                     | expected
  ${`Hello world!`}        | ${`Helloworld!`}
  ${`Hello      world!`}   | ${`Helloworld!`}
  ${` Hello      world! `} | ${`Helloworld!`}
`('returns $expected when $text', ({
  text,
  expected
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  // @ts-expect-error TS(2552): Cannot find name 'expect'. Did you mean 'expected'... Remove this comment to see the full error message
  expect(fullTrim(text)).toEqual(expected)
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('getTotal function', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return order amount with discount 1', () => {
    // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
    const result = getTotal([{ price: 10, quantity: 10 }], 1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(99)
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return order amount with discount 0', () => {
    // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
    const result = getTotal([{ price: 10, quantity: 10 }])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(100)
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return error if discount not a number', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(() => getTotal([{ price: 10, quantity: 10 }], `не число`)).toThrow('Скидка должна быть числом')
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return error if discount < 0', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(() => getTotal([{ price: 10, quantity: 10 }], -1)).toThrow('Процент скидки должен быть от 0 до 99')
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return error if discount > 99', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(() => getTotal([{ price: 10, quantity: 10 }], 100)).toThrow('Процент скидки должен быть от 0 до 99')
  })
})
