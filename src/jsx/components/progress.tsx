import { FC, h } from '../core'
import { Text } from '../../elements'

interface ProgressProps {
  progress: number
  comment?: string
}

export const Progress: FC<ProgressProps> = props => {
  // [####==================================] 100% | ETA: 0s | 200/200

  const X = ['█', '▊', '▌', '▎', ' ']

  const length = 40
  const progress = Math.ceil(length * (props.progress / 100))
  const fourth = (progress - Math.ceil(length * (props.progress / 100) * 4) / 4) * 4

  const filled = (
    <Text color="blue">
      {new Array(progress - 1).fill(X[0]).join('')}
      {X[fourth]}
    </Text>
  )
  const empty = new Array(length - progress).fill(' ').join('')

  const bar = `${filled}${empty}`

  let percent = (Math.round(props.progress * 10) / 10).toFixed(1)
  if (percent.length < 5) percent = new Array(5 - percent.length).fill(' ').join('') + percent

  return (
    <div>
      {percent}% {bar} {props.comment}
    </div>
  )
}
