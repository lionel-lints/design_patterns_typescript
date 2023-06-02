import { Strategy } from './Strategy'

interface Context {
  strategy?: Strategy;
  anonymize(profileId: string): void;
  setStrategy (strategy: Strategy): void; 
}

class anonymizationContext implements Context {

  constructor(public strategy:Strategy){}

  setStrategy(strategy: Strategy){
    this.strategy = strategy;
  } 

  anonymize(profileId: string){
    return this.strategy.anonymize(profileId);
  }
}

export { Context, anonymizationContext };
