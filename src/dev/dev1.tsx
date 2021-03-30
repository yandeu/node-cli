import { Box, Color, Red, Text } from '../elements'
import { clear, write } from '../cli'
import { h, render } from '../jsx/core'
import { Fragment } from '../jsx/fragment'
import { Loading } from '../jsx/components/loading'

const App = () => (
  <>
    <Red>⠕ </Red>
    <p>I am a paragraph</p>
    <table>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
    </table>
    <hr />
    Link to the <a href="http://google.com">google</a> website.
    <br />
    <Box>small box!</Box>
    <Box>
      <Red>small box!</Red>
    </Box>
    <Box big>big box :D</Box>
    {/* <div>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </div> */}
    <Color color="red">
      <u>test</u>
    </Color>
  </>
)

const styles = {
  'my-class-one': {
    color: 'yellow',
    background: 'black'
  }
}

let i = 0
setInterval(() => {
  i++
  clear(1).then(() => {
    write(<Loading frame={i}>bla bla...</Loading>)
  })
}, 60)
;(async () => {
  const text = await render(<Text color="red">bli bla blu</Text>)
  write(text)
})()
