import { Newsletter } from './Subject'
import { NewsletterSubscriber } from './Observer'


const main = () => {
  console.log('FIRST we start 4 subscribers')
  const a = new NewsletterSubscriber('a', [])
  console.log(a)
  const b = new NewsletterSubscriber('b', [])
  console.log(b)
  const c = new NewsletterSubscriber('c', [])
  console.log(c)
  const d = new NewsletterSubscriber('d', [])
  console.log(d)

  console.log('')
  console.log('SECOND, we start 2 newsletters')
  const letterA = new Newsletter('paper A',[],['A text article that already exists'])
  console.log(letterA)
  const letterB = new Newsletter('paper B',[],[])
  console.log(letterB)

  console.log('')
  console.log('THIRD, we add some subscribers to the newsletters')
  letterA.subscribeObserver(a)
  letterA.subscribeObserver(b)
  letterB.subscribeObserver(b)
  letterB.subscribeObserver(c)
  console.log(letterA)
  console.log(letterB)

  console.log('')
  console.log('here are the subscribers again')
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)


  console.log('')
  console.log('now we add an article to letterB')
  letterB.addArticle('Something new to wet your whistle')
  console.log('here are the subscribers again')
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)

  console.log('')
  console.log('now we remove an article from letterA')
  letterA.removeArticle('A text article that already exists')
  console.log('here are the subscribers again')
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)
  console.log('')
  console.log('finally, we remove a subscriber(a) from letterA')
  letterA.unsubscribeObserver(a)
  console.log('here are the subscribers again')
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)
}

export default main
