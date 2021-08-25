interface Command {
  execute (): void;
}

type commandParams = { id?: string, name: string }

class CommandQuery implements Command {
  constructor(readonly query: (params: commandParams) => any, readonly params: commandParams){}
  execute () {
    this.query(this.params);
  }
}

export { CommandQuery, commandParams }
