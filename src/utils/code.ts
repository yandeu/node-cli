import { Styles, StylesType, styles } from './styles'

export const code = (type: StylesType, style: Styles, text: string) => {
  for (const el in styles[type]) {
    // @ts-ignore
    const codes = styles[type][el]
    if (el === style) return `\u001b[${codes[0]}m${text}\u001b[${codes[1]}m`
  }

  return text
}
