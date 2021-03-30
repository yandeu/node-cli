import { clear, hideCursor, write } from '../cli'
import { Green } from '../elements'
import { h } from '../jsx/core'
import readline from 'readline'

var select: any[] = []
var selected = 0
var choices = ['Patch', 'Minor', 'Major', 'Peter']

const printChoices = () => {
  let msg = ''

  choices.forEach((choice, index) => {
    const is = selected === index

    const s = select.includes(index)

    if (s) {
      msg += `${(<Green>√</Green>)} ${choice}\n`
    } else if (is) msg += `${(<Green>◉</Green>)} ${choice}\n`
    else msg += `◯ ${choice}\n`
  })

  write(msg)
}

hideCursor()

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (s, key) => {
  // "Raw" mode so we must do our own kill switch (ctrl + c)
  if (key.sequence === '\u0003') {
    process.exit(0)
  }

  if (key.name === 'space') {
    select.push(selected)
  }

  if (key.name === 'up' && selected - 1 >= 0) {
    selected--
  } else if (key.name === 'down' && selected + 1 < choices.length) {
    selected++
  } else if (key.name === 'return') {
    const next = choices[selected]
    const v = choices[selected].split('.')

    if (next === 'Patch') v[2] += 1

    write(`You chose: ${choices[selected]}`)

    return
  } else {
    // printChoices()
    // return
  }

  clear().then(() => {
    printChoices()
  })
})
;(async () => {
  printChoices()
})()
