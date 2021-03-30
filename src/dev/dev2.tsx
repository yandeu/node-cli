import { clear, clearDisplay, hideCursor, showCursor, write } from '../cli'
import { h, render } from '../jsx/core'
import { Tabs } from '../jsx/components/input/Tabs'
import { code } from '../elements'
import readline from 'readline'

// compact, normal and small

const o = code('color', 'gray', 'tab1')
const p = code('background', 'blue', 'tab2')
const q = code('color', 'gray', 'tab3')

const d = code('color', 'gray', 'Demo')

const textT = '    ╭──────╮                    ╭──────╮       '
const textB = `╭───┤ tap1 ├───╮──╮──╮     ${d} │ Code │       ╭─ ${o} | tab2 | ${q} ──────╮`
const text3 = '┴───┘      └───┴──┴──┴─   ──────┘      └─ '

const main = async () => {
  const onChangeHandler = (data: { index: number; tabs: string }) => {
    clear().then(() => {
      write(data.tabs)

      write('') // empty line

      if (data.index === 0) {
        write('text one')
        write('text one')
        write('text one')
        write('text one')
        write('text one')
      }

      if (data.index === 1) {
        write('text two')
      }
    })
  }

  await clearDisplay()
  await render(<Tabs tabs={['one', 'two', 'three']} onChange={data => onChangeHandler(data)}></Tabs>)

  write('')
  write(textT)
  write(textB)
  write(text3)
  write('')
  write('')
}

main()

hideCursor()

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (s, key) => {
  // "Raw" mode so we must do our own kill switch (ctrl + c)
  if (key.sequence === '\u0003') {
    showCursor()
    process.exit(0)
  }
})
