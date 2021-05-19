import { Gray, Text } from '../elements'
import { MultiSelect, Progress, Select, Tabs, Write, YesNo } from '../jsx/components'
import { clear, clearDisplay, hideCursor, showCursor, write } from '../cli'
import { comment, error, info, question, step, success, warn } from '../messages'
import { h, render } from '../jsx/core'
import { Fragment } from '../jsx/fragment'
import { Loading } from '../jsx/components/loading'
import readline from 'readline'

let isMainMenu = true
let answer: any
let index = 0
let canExit = true

const main = async () => {
  answer = undefined
  isMainMenu = true
  await clearDisplay()

  write(<Gray>node-cli examples:</Gray>)

  const options = [
    'Yes/No',
    'Write Answer',
    'Select',
    'Multi Select',
    'Messages',
    'Tabs',
    'Progress Bar',
    'Loading Spinner',
    'Text',
    'List',
    'Table',
    'Link'
  ]
  index = await render(<Select question="Select an example" options={options} index={index} />)

  if (typeof index !== 'undefined') {
    isMainMenu = false
    await clearDisplay()

    switch (options[index]) {
      case 'Yes/No':
        answer = await render(<YesNo question="Simple yes or no question" />)
        break
      case 'Write Answer':
        answer = await render(<Write question="Tell Me what's on your mind" />)
        break
      case 'Select':
        answer = await render(
          <Select question="Select one color" options={['Blue', 'Red', 'Green', 'Yellow', 'Black']} />
        )
        break
      case 'Multi Select':
        answer = await render(
          <MultiSelect question="Select your menu" options={['Pizza', 'Pasta', 'Nuggets', 'Burger']} />
        )
        break
      case 'Messages':
        step('step')
        warn('warn')
        success('success', null)
        error('error', false)
        info('info')
        question('question', null)
        comment('comment')
        break
      case 'Tabs':
        await render(<Tabs tabs={['one', 'two', 'three']} onChange={d => onTabsChangeHandler(d)} />)
        break
      case 'Progress Bar':
        canExit = false
        await progressBar()
        canExit = true
        break
      case 'Loading Spinner':
        canExit = false
        await loadingSpinner()
        canExit = true
        break
      case 'Text':
        write(
          <>
            <Text color="red">red</Text>
            <br />
            <Text background="blue">blue</Text>
            <br />
            <Text underline>underline</Text>
          </>
        )
        break
      case 'List':
        write(
          <>
            <h1>Unordered List:</h1>
            <ul>
              <li>one</li>
              <li>two</li>
            </ul>
            <br />
            <h1>Ordered List:</h1>
            <ol>
              <li>one</li>
              <li>two</li>
            </ol>
          </>
        )
        break
      case 'Table':
        write(
          <table>
            <tr>
              <th>Names</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Joe</td>
              <td>49</td>
            </tr>
            <tr>
              <td>Mila</td>
              <td>42</td>
            </tr>
          </table>
        )
        break
      case 'Link':
        write(
          <p>
            <h1>Check the source code of this example:</h1>
            <a href="https://github.com/yandeu/node-cli/blob/main/src/examples/index.tsx">GitHub Repo</a>
          </p>
        )
        break

      default:
      // code block
    }
  }

  write('')
  if (typeof answer !== 'undefined') step(`Answer: ${answer}`)
  comment('Ctrl+C to go back')
}

/**
 * Hide Cursor
 */
hideCursor()

/**
 * Listen for inputs
 */
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
  // "Raw" mode so we must do our own kill switch (ctrl + c)
  if (key.sequence === '\u0003' && canExit) {
    if (!isMainMenu) {
      setTimeout(() => {
        main()
      })
    } else {
      setTimeout(() => {
        showCursor()
        process.exit(0)
      })
    }
  }
})

main()

/**
 * Progress Bar
 */
const progressBar = (): Promise<void> => {
  let progress = 0
  const steps = 133
  const fps = 30
  let time = steps / fps

  const render = () => {
    const ETA = `${Math.round(time)}s`
    const bar = <Progress progress={(progress / steps) * 100} comment={`| ETA: ${ETA} | ${progress}/${steps} `} />
    clear(2).then(() => {
      write(bar)
    })
  }

  return new Promise(resolve => {
    const interval = setInterval(() => {
      progress++
      time -= 1 / fps
      render()
      if (progress >= steps) {
        clearInterval(interval)
        clear(2).then(() => {
          return resolve()
        })
      }
    }, 1000 / fps)
  })
}

/**
 * Loading Spinner
 */
const loadingSpinner = (): Promise<void> => {
  return new Promise(resolve => {
    let frame = 0
    const interval = setInterval(() => {
      frame++

      if (frame > 100) {
        clearInterval(interval)
        return resolve()
      }
      clear(1).then(() => {
        write(<Loading frame={frame}>Loading...</Loading>)
      })
    }, 1000 / 60)
  })
}

/**
 * Handle Tabs Changing
 */
const onTabsChangeHandler = async (data: { index: number; tabs: string }) => {
  await clearDisplay()
  write(data.tabs)

  write('') // empty line
  write('Content nr. ', data.index)

  write('')
  comment('Ctrl+C to go back')
}
