import { concreteContext } from './Context'
import { CSVConverter, binaryStringConverter, JSONConverter } from './Strategy'

const main = () => {

  let bCon = new binaryStringConverter()
  let cCon = new CSVConverter()
  let jCon = new JSONConverter()

  let cont = new concreteContext(jCon)


  console.log(cont.doConversion('key1'))
  console.log(cont.doConversion('key2'))
  cont.setStrategy(bCon);
  console.log(cont.doConversion('key1'))
  console.log(cont.doConversion('key2'))
  cont.setStrategy(cCon);
  console.log(cont.doConversion('key1'))
  console.log(cont.doConversion('key2'))
}

export default main
