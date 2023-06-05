import { anonymizationContext } from './Context'
import { EmailAnonymizer } from './Strategy'

const main = (profileId:string, configuration: string) => {

  let eAnon = new EmailAnonymizer()
  let cont = new anonymizationContext(eAnon)


  console.log(cont.anonymize('2'))
}

export default main
