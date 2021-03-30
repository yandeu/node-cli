import { Component } from './component'

export interface Key {
  sequence: string
  name: string
  ctrl: boolean
  meta: boolean
  shift: boolean
}

export abstract class InputComponent<T> extends Component<T> {
  str = ''

  abstract onKeyPress(str: string, key: Key): void

  private async _onKeyPress(str: string, key: Key) {
    // kill the event listener early
    if (key.sequence === '\u0003') {
      process.stdin.removeListener('keypress', this._onKeyPress)
      this.exit()
    }
    // call onKeyPress()
    else this.onKeyPress(str, key)
  }

  _onExit() {
    process.stdin.removeListener('keypress', this._onKeyPress)
  }

  _start() {
    this._onKeyPress = this._onKeyPress.bind(this)
    process.stdin.on('keypress', this._onKeyPress)
  }
}
