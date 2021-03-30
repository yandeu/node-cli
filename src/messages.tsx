import { Blue, Bold, Gray, Green, Red } from './elements'
import { Fragment } from './jsx/fragment'
import { h } from './jsx/core'
import { symbols } from './symbols'
import { write } from './cli'

const arrow = <Blue>{symbols.arrow}</Blue>
const questionMark = <Green>{symbols.question}</Green>
const yesNo = <Gray>{symbols.yesNo}</Gray>
const squareRoot = <Green>{symbols.squareRoot}</Green>

export const error = (msg?: string, exit: boolean = true) => {
  const symbol = <Red>{symbols.cross}</Red>

  if (msg) write(`${symbol} ${msg}`)
  else write(`${symbol} unknown error`)

  if (exit) process.exit(1)
}

export const question = (text: string, comment: null | string, output: boolean = true) => {
  let message = '\n'

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

export const success = (text: string, comment: null | string, output: boolean = true) => {
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
