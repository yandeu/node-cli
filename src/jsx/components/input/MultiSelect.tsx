import { Green, code } from '../../../elements'
import { InputComponent, Key } from '../../inputComponent'
import { clear, write } from '../../../cli'
import { comment, question, step } from '../../../messages'
import { h } from '../../core'
import { symbols } from '../../../symbols'

export class MultiSelect extends InputComponent<{ question?: string; options: string[] }> {
  private _index = 0
  private _selected: number[] = []

  printOptions() {
    this.props.options.forEach((option, i) => {
      const isSelected = this._selected.includes(i)

      let symbol = symbols.largeCircle
      let text = option

      if (i === this._index) {
        text = code('modifier', 'underline', text)
        symbol = symbols.fisheye
      }

      if (isSelected) {
        symbol = symbols.squareRoot
        text = <Green>{text}</Green>
        symbol = <Green>{symbol}</Green>
      }

      write(`${symbol} ${text}`)
    })
  }

  onKeyPress(str: string, key: Key) {
    if (key.name === 'up' && this._index > 0) {
      this._index--
      clear(this.props.options.length).then(() => {
        this.printOptions()
      })
    }

    if (key.name === 'down' && this._index < this.props.options.length - 1) {
      this._index++
      clear(this.props.options.length).then(() => {
        this.printOptions()
      })
    }

    if (key.name === 'space') {
      if (!this._selected.includes(this._index)) this._selected.push(this._index)
      else {
        const i = this._selected.indexOf(this._index)
        this._selected = [...this._selected.slice(0, i), ...this._selected.slice(i + 1)]
      }

      clear(this.props.options.length).then(() => {
        this.printOptions()
      })
    }

    if (key.name === 'return') this.exit(this._selected)

    return
  }

  start() {
    if (this.props.question) question(this.props.question, '(select with space)')
    this.printOptions()
  }
}
