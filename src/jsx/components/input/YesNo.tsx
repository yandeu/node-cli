import { InputComponent, Key } from '../../inputComponent'
import { question } from '../../../messages'

export class YesNo extends InputComponent<{ question: string }> {
  onKeyPress(str: string, key: Key) {
    if (str === 'y') this.exit(true)
    if (str === 'n') this.exit(false)

    if (key.name === 'return') this.exit(true)

    return
  }

  start() {
    question(this.props.question, '(y/n)')
  }
}
