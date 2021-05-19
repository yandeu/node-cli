import { FC, _tick, h } from './jsx/core'
import type { Background as _Background, Color as _Color, Modifier as _Modifier } from './utils'
import type { TextProps } from './utils'
import { code } from './utils/code'
import { stringLength } from './utils/stringLength'

export { code }

export const Box: FC<{ big?: boolean; children?: any }> = props => {
  const isBig = props.big || false

  const text = props.children

  let length = stringLength(text) + 2
  if (isBig) length += 4

  const lines = new Array(length).fill('─').join('')
  const spaces = new Array(length).fill(' ').join('')

  if (isBig) {
    return (
      <div>
        {`┌${lines}┐`}
        <br />
        {`│${spaces}│`}
        <br />
        {`│   ${text}   │`}
        <br />
        {`│${spaces}│`}
        <br />
        {`└${lines}┘`}
        <br />
      </div>
    )
  }

  return (
    <div>
      {`┌${lines}┐`}
      <br />
      {`│ ${text} │`}
      <br />
      {`└${lines}┘`}
      <br />
    </div>
  )
}

export const Text: FC<TextProps> = props => {
  let el = props.children

  if (props.color) el = <Color color={props.color}>{el}</Color>
  if (props.background) el = <Background color={props.background}>{el}</Background>

  Object.keys(props).forEach(p => {
    if (!['color', 'background', 'children'].includes(p)) {
      el = <Modifier modifier={p as keyof Omit<TextProps, 'color' | 'background' | 'children'>}>{el}</Modifier>
    }
  })

  return el
}

// modifiers
export const Modifier: FC<{ modifier: _Modifier; children?: any }> = props => {
  return code('modifier', props.modifier, props.children)
}
export const Bold = (props: any) => {
  return code('modifier', 'bold', props.children)
}

// colors

export const Color: FC<{ color: _Color; children?: any }> = props => {
  return code('color', props.color, props.children)
}
export const Blue = (props: any) => {
  return code('color', 'blue', props.children)
}
export const Green = (props: any) => {
  return code('color', 'green', props.children)
}
export const Yellow = (props: any) => {
  return code('color', 'yellow', props.children)
}
export const Red = (props: any) => {
  return code('color', 'red', props.children)
}
export const Gray = (props: any) => {
  return code('color', 'gray', props.children)
}
export const Cyan = (props: any) => {
  return code('color', 'cyan', props.children)
}

// background
export const Background: FC<{ color: _Background; children?: any }> = props => {
  return code('background', props.color, props.children)
}
