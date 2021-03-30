import { FC, h } from '../core'
import { Blue } from '../../elements'
import { Fragment } from '../fragment'

interface LoadingProps {
  frame: number
  children?: any
}
export const Loading: FC<LoadingProps> = props => {
  const frames = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'

  const text = (props && props.children) ?? ''

  const t = props.frame
  const f = t % frames.length

  return (
    <>
      <Blue>{frames[f]}</Blue> {text}
    </>
  )
}
