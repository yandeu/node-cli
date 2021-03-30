import readline from 'readline'

// keep track of lines
let _lines = 0

export const lines = () => {
  return _lines
}

export const rows = () => {
  return process.stdout.rows
}

export const moveCursor = (dx: number, dy: number): Promise<void> => {
  return new Promise(resolve => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve()
    })
  })
}

/* Clears the current line of this WriteStream in a direction identified by dir. */
export const clearLine = (dir: -1 | 0 | 1): Promise<void> => {
  return new Promise(resolve => {
    process.stdout.clearLine(dir, () => {
      resolve()
    })
  })
}

export const cursorTo = (x: number, y?: number): Promise<void> => {
  return new Promise(resolve => {
    process.stdout.cursorTo(x, y, () => {
      resolve()
    })
  })
}

export const _clearLastLine = (): Promise<void> => {
  return new Promise(resolve => {
    if (_lines === 0) return resolve()

    // up one line
    process.stdout.moveCursor(0, -1, () => {
      // move to left
      process.stdout.cursorTo(0, undefined, () => {
        // clear from cursor to end
        process.stdout.clearLine(1, () => {
          _lines--
          resolve()
        })
      })
    })
  })
}

export const _clearLinesDown = (lines: number): Promise<void> => {
  return new Promise(resolve => {
    if (_lines === 0) return resolve()

    // up one line
    process.stdout.moveCursor(0, -lines, () => {
      // move to left
      process.stdout.cursorTo(0, undefined, () => {
        // clear from cursor to end
        process.stdout.clearScreenDown(() => {
          _lines -= lines
          resolve()
        })
      })
    })
  })
}

export const hideCursor = () => {
  cursor(false)
}

export const showCursor = () => {
  cursor(true)
}

export const cursor = (visible: boolean) => {
  process.stdout.write(visible ? '\u001B[?25h' : '\u001B[?25l')
}

/** Same as clear(1) */
export const clearLastLine = async () => {
  await clear(1)
}

export const clear = async (count = 0) => {
  if (_lines === 0) return

  if (count < 0) count = _lines + count

  const toRemove = _lines - count
  if (toRemove < 0) return

  // removes all lines in one run
  if (count > 0) await _clearLinesDown(_lines - toRemove)
  else await _clearLinesDown(_lines - count)

  // removes line by line
  // if (count > 0) while (_lines > toRemove) await _clearLastLine()
  // else while (_lines > count) await _clearLastLine()
}

export const clearDisplay = (): Promise<void> => {
  return new Promise(resolve => {
    readline.cursorTo(process.stdout, 0, 0) //  CSI`${y + 1};${x + 1}H`; // \u001b[0;0H"
    // console.log('\u001b[0;0H')

    readline.clearScreenDown(process.stdout, () => {
      // \u001b[0J

      _lines = 0

      resolve()
    })
    // console.log('\u001b[0J') // clearScreenDown
    // console.log('\u001b[2J') // clearDisplay
  })
}

export const write = (...data: Array<string | number>): number => {
  const d = data.join(' ')

  const count = (str: string) => {
    return str.match(/\n/gm)?.length || 0
  }

  const newLines = count(d) + 1

  _lines += newLines

  process.stdout.write(`${d}\n`)

  return newLines
}
