import { Arguments } from '../arguments'

/**
COMMAND:
program       2 args      option      option with 2 args
packageName   bla bli     -p          --output one two 
 */

const Args = new Arguments()

// console.log(Args.args)
// console.log(Args.parsedArgs)

// console.log(Args.getArguments())
// console.log(Args.getOptions())

// console.log(Args.getArgument(0))

console.log(Args.hasArgument('hello'))

console.log(Args.getOption('home', 'h'))
// console.log(Args.getOption('table', 't'))

console.log('home', Args.hasOption('home', 'h'))
