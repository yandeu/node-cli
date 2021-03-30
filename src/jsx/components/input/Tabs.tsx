import { InputComponent, Key } from '../../inputComponent'
import { clear, write } from '../../../cli'
import { Fragment } from '../../fragment'
import { Gray } from '../../../elements'
import { h } from '../../core'

// TODO(yandeu): Add following tabs
/**
const textA = '    ╭──────╮                    ╭──────╮       '
const textB = `╭───┤ tap1 ├───╮──╮──╮     ${d} │ Code │       ╭─ ${o} | tab2 | ${q} ──────╮`
const textC = '┴───┘      └───┴──┴──┴─   ──────┘      └─ '
 */

interface TabsProps {
  tabs: string[]
  onChange: (data: { index: number; tabs: string }) => void
}
export class Tabs extends InputComponent<TabsProps> {
  private _index = 0

  onKeyPress(str: string, key: Key) {
    const exits = ['escape', 'return']
    if (exits.includes(key.name)) this.exit(this._index)

    if (key.name === 'tab' || key.name === 'right') {
      this._index++
      this.updateTabs()
    }

    if (key.name === 'left') {
      this._index--
      this.updateTabs()
    }

    return
  }

  updateTabs() {
    // adjust index
    if (this._index > this.props.tabs.length - 1) this._index = 0
    if (this._index < 0) this._index = this.props.tabs.length - 1

    // send index and tabs
    this.props.onChange({ index: this._index, tabs: this.printTabs() })
  }

  printTabs(): string {
    let tabs = ''

    this.props.tabs.forEach((tab, i) => {
      if (i !== this._index) tabs += <Gray>{tab}</Gray>
      else tabs += tab

      if (i < this.props.tabs.length - 1) tabs += ' | '
    })

    return <>╭─ {tabs} ──────╮</>
  }

  start() {
    // send index and tabs
    this.props.onChange({ index: this._index, tabs: this.printTabs() })
  }
}
