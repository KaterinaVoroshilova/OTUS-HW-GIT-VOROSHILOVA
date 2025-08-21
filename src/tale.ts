function kolobok(name: any) {
  switch (name) {
    case `лиса`:
      return `Меня съели`
    case `дедушка`:
      return `Я от дедушки ушёл`
    case `заяц`:
      return `Я от зайца ушёл`
    default:
      return `нет такого персонажа`
  }
}

function newYear(name: any) {
  return `${name}! ${name}! ${name}!`
}

console.log(kolobok(`дедушка`))
console.log(kolobok(`лиса`))
console.log(kolobok(`заяц`))
console.log(kolobok(`волк`))
console.log(newYear(`Снегурочка`))
console.log(newYear(`Дед Мороз`))
