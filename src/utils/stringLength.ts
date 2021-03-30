export const stringLength = (str: string) => {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\u001b\[[0-9;]*m/gm, '').length
}
