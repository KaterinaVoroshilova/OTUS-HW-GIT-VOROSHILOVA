/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nameIsValid = (name: any) => typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name)

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fullTrim = (text: any) => (text ?? '').replace(/\s+/g, '')

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @returns {number}
 * @throws Вернёт ошибку, если скидка не число и больше 99 или меньше 0
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
export const getTotal = (items = [], discount = 0) => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом')
  }
  if (discount < 0 || discount >= 100) {
    throw new Error('Процент скидки должен быть от 0 до 99')
  }

  const total = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
  return total * (1 - discount / 100)
}

/**
 * Подсчёт суммы баллов успеваемости
 *
 * @param {scores} A scores object
 * @returns {number} The sum of scores values
 * @example scores = {Anna: 10,  Olga: 1,  Ivan: 5} getScore(scores) // 16
 */

const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5
}

let sum = 0

export const getScore = (scores = {}) => {
  for (const key in scores) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    sum = sum + scores[key]
  }
  return sum
}

console.log(getScore(scores))
