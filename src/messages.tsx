import { Blue, Bold, Cyan, Gray, Green, Red, Yellow } from './elements'
import { Fragment } from './jsx/fragment'
import { h } from './jsx/core'
import { symbols } from './symbols'
import { write } from './cli'

const arrow = <Blue>{symbols.arrow}</Blue>
const questionMark = <Green>{symbols.question}</Green>
const yesNo = <Gray>{symbols.yesNo}</Gray>
const squareRoot = <Green>{symbols.squareRoot}</Green>
const warning = <Yellow>{symbols.warning}</Yellow>
const information = <Cyan>{symbols.info}</Cyan>

export const error = (msg: string | null, exit: boolean) => {
  const symbol = <Red>{symbols.cross}</Red>

  if (msg) write(`${symbol} ${msg}`)
  else write(`${symbol} unknown error`)

  if (exit) process.exit(1)
}

export const warn = (text: string) => {
  write(
    <Bold>
      {warning} {text}
    </Bold>
  )
}

export const info = (text: string) => {
  write(
    <Bold>
      {information} {text}
    </Bold>
  )
}

export const question = (text: string, comment: null | string, output: boolean = true) => {
  let message = ''

  message += (
    <>
      <Bold>{`${questionMark} ${text} `}</Bold>
      {comment ? <Gray>{comment}</Gray> : null}
    </>
  )

  if (output) write(message)
  return message
}

export const step = (msg: string, output: boolean = true) => {
  const message = `${arrow} ${msg}`
  if (output) write(message)
  return message
}

export const success = (text: string, comment: null | string = null, output: boolean = true) => {
  const msg: string = (
    <Bold>
      {squareRoot} {text}
    </Bold>
  )

  const cmt = <Gray>{comment}</Gray>

  let message = ''

  if (comment) message = `${msg} ${cmt}`
  else message = msg

  if (output) write(message)
  return message
}

export const comment = (text: string, output: boolean = true) => {
  const message = <Gray>{text}</Gray>

  if (output) write(message)
  return message
}
