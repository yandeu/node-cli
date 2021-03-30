import { Blue, code } from '../../../elements'
import { InputComponent, Key } from '../../inputComponent'
import { clear, write } from '../../../cli'
import { comment, question, step } from '../../../messages'
import { h } from '../../core'
import { symbols } from '../../../symbols'

export class Select extends InputComponent<{ question?: string; options: string[]; index?: number }> {
  private _index = 0

  _start() {
    if (this.props.index) this._index = this.props.index
    super._start()
  }

  printOptions(_clear: boolean) {
    const output: string[] = []

    this.props.options.forEach((option, i) => {
      if (i === this._index) output.push(step(<Blue>{option}</Blue>, false))
      else output.push(`  ${option}`)
    })

    if (_clear) {
      clear(this.props.options.length).then(() => {
        write(output.join('\n'))
      })
    } else {
      write(output.join('\n'))
    }
  }

  onKeyPress(str: string, key: Key) {
    if (key.name === 'up' && this._index > 0) {
      this._index--
      this.printOptions(true)
    }

    if (key.name === 'down' && this._index < this.props.options.length - 1) {
      this._index++
      this.printOptions(true)
    }

    if (key.name === 'return') this.exit(this._index)

    return
  }

  start() {
    if (this.props.question) question(this.props.question, '(use arrow keys)')
    this.printOptions(true)
  }
}
