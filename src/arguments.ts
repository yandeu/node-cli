interface ParsedArgs {
  [key: string]: Array<string>
}

const sortObjectByKeys = (obj: any) => {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = obj[key]
      return result
    }, {})
}

export class Arguments {
  private _args: string[]
  private _parsedArgs: ParsedArgs = {}

  constructor(...args: string[]) {
    this._args = args.length > 0 ? args : process.argv.slice(2)
    this.parse()
  }

  public get args() {
    return this._args
  }

  public get parsedArgs() {
    return this._parsedArgs
  }

  private parse() {
    const isOption = /^--\S+$/
    const isShortOption = /^-[\w+]+$/
    const hasEqualSign = /^(--[\w-]+)=([\S\s]+)$/

    let options = false // following args belong to an option
    const _tmp: any[] = []
    let _args: ParsedArgs = {}

    // split merged short options (-ab => -a -b)
    this._args.forEach(a => {
      if (isShortOption.test(a)) {
        a.slice(1)
          .split('')
          .forEach(b => {
            _tmp.push(`-${b}`)
          })
      } else _tmp.push(a)
    })

    let lastOpt = ''

    // add args => { _: ['arg']}
    const addArg = (a: string) => {
      if (!_args['_']) _args = { ..._args, _: [a] }
      else _args = { ..._args, _: [..._args['_'], a] }
    }

    // add options => { opt: []}
    const addOption = (a: string) => {
      lastOpt = a
      if (typeof _args[a] === 'undefined') _args = { ..._args, [a]: [] }
    }

    // add args to options => { opt: ['arg1', 'arg2']}
    const addArgToOption = (a: string) => {
      const key = lastOpt
      _args = { ..._args, [key]: [..._args[key], a] }
    }

    _tmp.forEach(a => {
      let isOpt = false

      if (isOption.test(a) || isShortOption.test(a)) {
        isOpt = options = true
      }

      if (hasEqualSign.test(a)) {
        const e = hasEqualSign.exec(a)
        if (e && e[1] && e[2]) {
          addOption(e[1])
          addArgToOption(e[2])
          options = false
        }
      } else if (!options) {
        addArg(a)
      } else if (isOpt) {
        addOption(a)
      } else if (lastOpt) {
        addArgToOption(a)
      }
    })

    this._parsedArgs = _args
  }

  public getArguments() {
    return this._parsedArgs['_']
  }

  public getOptions() {
    let _tmp: ParsedArgs = {}

    for (const [key, value] of Object.entries(this._parsedArgs)) {
      if (key !== '_') {
        _tmp = { ..._tmp, [key.replace(/-+/, '')]: value }
      }
    }

    return sortObjectByKeys(_tmp)
  }

  public getOption(option: string, ...alias: string[]) {
    const _tmp = []

    const opts = this.getOptions()

    if (opts[option]) {
      _tmp.push(...opts[option])
    }

    if (alias && Array.isArray(alias)) {
      alias.forEach(a => {
        if (a && opts[a]) {
          _tmp.push(...opts[a])
          return
        }
      })
    }

    return _tmp.length > 0 ? _tmp : undefined
  }

  public hasOption(option: string, ...alias: string[]) {
    return this.getOption(option, ...alias) ? true : false
  }

  public getArgument(index: number) {
    const args = this.getArguments()
    if (args[index]) return args[index]
    else return undefined
  }

  public hasArgument(arg: string) {
    const args = this.getArguments()
    return args.includes(arg)
  }
}
