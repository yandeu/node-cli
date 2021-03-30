/**
 * @copyright    Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * @license      {@link https://github.com/sindresorhus/has-flag/blob/main/license|MIT}
 * @description  modified version of https://github.com/sindresorhus/has-flag/blob/main/index.js
 */

/** hasFlag */
export const hasFlag = (flag: string, argv = process.argv) => {
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--'
  const position = argv.indexOf(prefix + flag)
  const terminatorPosition = argv.indexOf('--')
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition)
}
