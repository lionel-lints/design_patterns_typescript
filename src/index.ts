import mainObserver from './Observer/main'
import mainStrategy from './Strategy/main'


const main = ():void => {
  console.log("")
  console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
  console.log("'''''''''''''''''''''STRATEGY'''''''''''''''''''''")
  console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
  console.log("")
  mainStrategy()
  console.log("")
  console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
  console.log("'''''''''''''''''''''OBSERVER'''''''''''''''''''''")
  console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
  console.log("")
  mainObserver()
}

main()
