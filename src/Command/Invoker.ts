import { CommandQuery } from './Command'

interface CommandInvoker {
  setCommand(command: CommandQuery): void;
  runCommand(): void;
}

class InvocationManager implements CommandInvoker {
  constructor (private command?: CommandQuery){
  }

  setCommand(command: CommandQuery){
    this.command = command;
  }

  runCommand(){
    if(this.command === undefined) return
    this.command.execute();
  }
}

export { InvocationManager }
