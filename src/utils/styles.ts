/**
 * @copyright    Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * @license      {@link https://github.com/Marak/colors.js/blob/master/lib/styles.js|MIT}
 * @description  modified version of https://github.com/Marak/colors.js/blob/master/lib/styles.js
 */

// usage '\u001b[Xm' // where X is the number

export type Styles = Modifier | Background | Color
export type StylesType = keyof typeof styles
export type Modifier = keyof typeof styles.modifier
export type Background = keyof typeof styles.background
export type Color = keyof typeof styles.color

export type ModifierKeys = {
  [key in Modifier]: boolean
}

export interface TextProps extends Partial<ModifierKeys> {
  color?: Color
  background?: Background
  children?: any
}

export const styles = {
  modifier: {
    reset: [0, 0],

    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    overline: [53, 55]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39], // brightBlack
    grey: [90, 39], // brightBlack

    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39]
  },
  background: {
    black: [40, 49],
    red: [41, 49],
    green: [42, 49],
    yellow: [43, 49],
    blue: [44, 49],
    magenta: [45, 49],
    cyan: [46, 49],
    white: [47, 49],
    gray: [100, 49], // brightBlack
    grey: [100, 49], // brightBlack

    brightRed: [101, 49],
    brightGreen: [102, 49],
    brightYellow: [103, 49],
    brightBlue: [104, 49],
    brightMagenta: [105, 49],
    brightCyan: [106, 49],
    brightWhite: [107, 49]
  }
}
