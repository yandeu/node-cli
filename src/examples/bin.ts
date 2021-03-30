#!/usr/bin/env node

import { code } from '../utils'
import { error } from '../messages'

const args = process.argv.splice(2)

if (args.length !== 1 || args[0] !== '--examples') {
  const text = `Please run: ${code('modifier', 'bold', 'npx node-cli@latest --examples')}`
  error(text)
}

// eslint-disable-next-line sort-imports
import './index'
