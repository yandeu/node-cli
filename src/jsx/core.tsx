import { isClass, isFunction, link, list, table } from './utils'
import { Blue } from '../elements'
import { code } from '../utils/code'

export interface FC<P = any> {
  (props: P): any
  // (props: P, context?: any): any
}

export let _tick = 0
let _styles: any = {}

export const h = (tag: any, props: any, ...children: any) => {
  let text = children.join('')

  if (isClass(tag)) return { isClass: true, tag, props, children: text }

  if (isFunction(tag)) return tag({ ...props, children: text })

  // NEEDS IMPROVEMENT:
  if (props && props.class) {
    const c = _styles[props.class]
    if (c) {
      if (c.color) text = code('color', c.color, text)
      if (c.background) text = code('background', c.background, text)
    }
  }

  if (tag === 'i') return code('modifier', 'italic', text)
  if (tag === 'b') return code('modifier', 'bold', text)
  if (tag === 'u') return code('modifier', 'underline', text)
  if (tag === 's') return code('modifier', 'strikethrough', text)
  if (tag === 'br') return '\n'
  if (['p', 'div', 'h1', 'h2', 'h3', 'h4'].includes(tag)) return `${text}\n`
  if (tag === 'hr')
    return `\n${new Array(process.stdout.columns)
      .fill(null)
      .map(() => '―')
      .join('')}\n`
  if (tag === 'a') return <Blue>{link(text, props.href)}</Blue>
  if (tag === 'ol') return list(true, children)
  if (tag === 'ul') return list(false, children)
  if (tag === 'tr') return children
  if (tag === 'table') return table(children)

  // todo  blockquote button progress code  table ul ol li

  return `${tag} ${text}`
}

export const render = async (element: any, options: { styles?: any } = {}): Promise<any> => {
  const { styles } = options

  _styles = styles || {}
  _tick++

  if (element.isClass) {
    const { tag, props, children } = element
    const c = new element.tag({ ...props, children })
    await c._start()
    return new Promise((resolve, reject) => {
      c.start()
      c._exit = (data?: any) => {
        return resolve(data)
      }
      c._error = (err: string) => {
        return reject(err)
      }
    })
  } else if (typeof element === 'function') {
    // TODO(yandeu): change this (maybe)
    return element()
  } else {
    return element
  }
}
