import { Strategy, ConversionOutput } from './Strategy'

interface Context {
  strategy?: Strategy;
  doConversion (dataSetName:string): void;
  setStrategy (strategy: Strategy): void; 
}

class concreteContext implements Context {

  constructor(public strategy:Strategy){}

  setStrategy(strategy: Strategy){
    this.strategy = strategy;
  } 

  doConversion (dataSetName:string){
    return this.strategy.convert(dataSetName);
  }
}

export { Context, concreteContext };
