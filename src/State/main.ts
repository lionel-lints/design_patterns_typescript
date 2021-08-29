// main
import {
  LockedOriginalDocument,
  EditableOriginalDocument,
} from './State'

const sleep = (m: any) => new Promise(r => setTimeout(r, m))

// the client runtime
const main = async () => {
  console.log('')
  console.log('First we create an array of Objects with Original State')
  const a = new LockedOriginalDocument('locked text for a', true)
  const b = new EditableOriginalDocument('unlocked text for b', false)

  const draftManager = [a, b];

  await sleep(1000)
  console.log(draftManager)

  await sleep(1000)
  console.log('')
  console.log('then we try to edit the locked document')

  await sleep(1000)
  draftManager[0] = draftManager[0].update('new text for A')
  console.log('')
  console.log("after the update:", draftManager[0])

  await sleep(1000)
  console.log('')
  console.log('then we try to edit the locked document')
  draftManager[1] = draftManager[1].update('new text for B')

  await sleep(1000)
  console.log('')
  console.log(draftManager)

  await sleep(1000)
  console.log('')
  console.log("as you can see, ^up there^, the editable document transitioned while the locked one did not")

  await sleep(1000)
  console.log('')
  console.log("finally we try out the query plan for each document given thier current state")

  await sleep(1000)
  console.log('')
  draftManager.forEach(draft => draft.executeQueryPlan())

}

export default main
