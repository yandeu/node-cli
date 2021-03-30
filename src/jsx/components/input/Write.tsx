import { Blue, Gray } from '../../../elements'
import { InputComponent, Key } from '../../inputComponent'
import { clear, write } from '../../../cli'
import { comment, question, step } from '../../../messages'
import { h } from '../../core'
import { symbols } from '../../../symbols'

export class Write extends InputComponent<{
  question?: string
  prompt?: string
  placeholder?: string
}> {
  private _prompt = ''
  private _placeholder = ''

  private getPrompt() {
    this._prompt = this.props.prompt ?? <Blue>{symbols.heavyRightAngle1} </Blue>
    return this._prompt
  }

  constructor(props: any) {
    super(props)

    this.str = this.getPrompt()

    this._placeholder = this.props.placeholder ?? 'write'
    this._placeholder = <Gray>{this._placeholder}</Gray>

    this.str += this._placeholder
  }

  onKeyPress(str: string, key: Key) {
    if (!str) return

    // remove placeholder
    if (this._placeholder.length > 0) {
      this.str = this.getPrompt()
      this._placeholder = ''
    }

    if (key.name === 'return') return this.exit(this.str.slice(this._prompt.length))

    if (key.name === 'backspace') {
      if (this.str.length <= this._prompt.length) return
      this.str = this.str.slice(0, -1)
    } else {
      this.str += str
    }

    clear(1).then(() => {
      write(this.str)
    })

    return
  }

  start() {
    if (this.props.question) question(this.props.question, '(write your answer)')
    write(this.str)
  }
}
