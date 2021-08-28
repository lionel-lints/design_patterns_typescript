import { CommandQuery, commandParams } from './Command'
import { InvocationManager } from './Invoker'

// external system query (this can be a request outside our system, but here it's just a logging device
const specialLogQuery = (params: commandParams) => {
  console.log('query is being run!')
  console.log(`query got the following params: ${JSON.stringify(params)}`)
}

// the client runtime
const main = async () => {
  console.log('first we create the InvocationManager')
  const invoker = new InvocationManager()

  console.log('then we create a command')
  const commandObj = new CommandQuery(specialLogQuery, { id: 's908f709s', name: 'johhnyObject' })
  const commandObj2 = new CommandQuery(specialLogQuery, { id: 'o239u4lknm', name: 'johhnyNew' })

  console.log('then we set the command')
  invoker.setCommand(commandObj)
  console.log('then we wait')
  const sleep = (m: any) => new Promise(r => setTimeout(r, m))
  console.log('1 sec')
  await sleep(1000)
  console.log('other actions could take place while the command is encapsulated')
  await sleep(1000)
  console.log('3 sec')
  invoker.setCommand(commandObj2)
  await sleep(1000)

  console.log('finally we use the invoker to run the command')
  invoker.runCommand()
}

export default main
