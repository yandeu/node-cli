/**
 * @copyright    Copyright (c) James Talmage <james@talmage.io> (github.com/jamestalmage)
 * @license      {@link https://github.com/jamestalmage/supports-hyperlinks/blob/master/license|MIT}
 * @description  modified version of https://github.com/jamestalmage/supports-hyperlinks/blob/master/index.js
 */

import { hasFlag } from './hasFlag'

const parseVersion = (versionString: string) => {
  if (/^\d{3,4}$/.test(versionString)) {
    // Env var doesn't always use dots. example: 4601 => 46.1.0
    const m = /(\d{1,2})(\d{2})/.exec(versionString) as any
    return {
      major: 0,
      minor: parseInt(m[1], 10),
      patch: parseInt(m[2], 10)
    }
  }

  const versions = (versionString || '').split('.').map(n => parseInt(n, 10))
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2]
  }
}

export const supportsHyperlink = (
  stream: NodeJS.WriteStream & {
    fd: 1
  }
) => {
  const { env } = process as NodeJS.Process
  if (!env) return

  if ('FORCE_HYPERLINK' in env && env.FORCE_HYPERLIN) {
    return !(env.FORCE_HYPERLIN.length > 0 && parseInt(env.FORCE_HYPERLIN, 10) === 0)
  }

  if (hasFlag('no-hyperlink') || hasFlag('no-hyperlinks') || hasFlag('hyperlink=false') || hasFlag('hyperlink=never')) {
    return false
  }

  if (hasFlag('hyperlink=true') || hasFlag('hyperlink=always')) {
    return true
  }

  // If they specify no colors, they probably don't want hyperlinks.
  // if (!supportsColor.supportsColor(stream)) {
  //   return false
  // }

  if (stream && !stream.isTTY) {
    return false
  }

  if (process.platform === 'win32') {
    return false
  }

  if ('CI' in env) {
    return false
  }

  if ('TEAMCITY_VERSION' in env) {
    return false
  }

  if ('TERM_PROGRAM' in env && env.TERM_PROGRAM_VERSION) {
    const version = parseVersion(env.TERM_PROGRAM_VERSION)

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        if (version.major === 3) {
          return version.minor >= 1
        }

        return version.major > 3
      // No default
    }
  }

  if ('VTE_VERSION' in env && env.VTE_VERSION) {
    // 0.50.0 was supposed to support hyperlinks, but throws a segfault
    if (env.VTE_VERSION === '0.50.0') {
      return false
    }

    const version = parseVersion(env.VTE_VERSION)
    return version.major > 0 || version.minor >= 50
  }

  return false
}
