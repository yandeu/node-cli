import { code } from '../utils'
import { supportsHyperlink } from '../utils/supportsHyperlink'
import { write } from '../cli'

export const _styles: any = {}

export const isClass = (func: any) => {
  return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func))
}

export const isFunction = (func: any) => {
  return typeof func === 'function'
}

// https://github.com/sindresorhus/ansi-escapes/blob/main/index.js
export const link = (text: string, url: string) => {
  const linkSupported = supportsHyperlink(process.stdout)

  const ESC = '\u001B['
  const OSC = '\u001B]'
  const BEL = '\u0007'
  const SEP = ';'
  return [OSC, '8', SEP, SEP, url, BEL, linkSupported ? text : url, OSC, '8', SEP, SEP, BEL].join('')
}

// NEEDS IMPROVEMENT(yandeu):
export const list = (ordered: boolean, children: any) => {
  const elements = children.map((c: string) => c.replace(/^li /gm, ''))

  return elements
    .map((el: string, nr: number) => {
      return ordered ? ` ${nr + 1}. ${el}\n` : ` • ${el}\n`
    })
    .join('')
  // .replace(/\n$/, '')
}

// NEEDS IMPROVEMENT(yandeu):
export const table = (children: any) => {
  const chars = {
    top: '─',
    topMid: '┬',
    topLeft: '┌',
    topRight: '┐',
    bottom: '─',
    bottomMid: '┴',
    bottomLeft: '└',
    bottomRight: '┘',
    left: '│',
    leftMid: '├',
    mid: '─',
    midMid: '┼',
    right: '│',
    rightMid: '┤',
    middle: '│'
  }
  const truncate = '…'

  const rows = children

  write(code('color', 'gray', '(this component is not finished yet)'))
  write('')

  const t = `${rows
    .map((column: string[]) => {
      return `${column
        .map((data: string) => {
          const text = /^th/.test(data) ? code('modifier', 'bold', data.substring(3).trim()) : data.substring(3).trim()
          return `${text} |`
        })
        .join(' ')}\n`
    })
    .join('')}\n`

  return t
}
