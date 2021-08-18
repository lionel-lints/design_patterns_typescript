import { Observer } from './Observer'

// The subject interface manages the subscriptions and notifications.
interface Subject {
  subscribeObserver (obs: Observer): void;
  unsubscribeObserver (obs: Observer): void;
  notifyObservers (add: boolean, article: string): void;
}

interface NewsletterInterface {
  getArticles(): string[];
  addArticle(article: string): void;
  removeArticle(article:string): void;
}

class Newsletter implements Subject, NewsletterInterface {
  constructor(public name:string, private subscribers: Observer[], private articles: string[]){
  }
  subscribeObserver (obs:Observer){
    if(this.subscribers.indexOf(obs) === -1){
      this.subscribers.push(obs)
      obs.update(this.name, this.articles, false)
    }
  }
  unsubscribeObserver (obs:Observer){
    const obsInd = this.subscribers.indexOf(obs)
    if(obsInd !== -1){
      this.subscribers.splice(obsInd, 1)
      obs.update(this.name, [], true)
    }
  }
  notifyObservers(){
    this.subscribers.forEach((obs:Observer) => {
      obs.update(this.name, this.articles, false)
    })
  }
  getArticles(){
    return this.articles;
  }
  addArticle(article: string){
    if(this.articles.indexOf(article) === -1){
      this.articles.push(article)
      this.notifyObservers()
    }
  }
  removeArticle(article: string){
    const artInd = this.articles.indexOf(article)
    if(artInd !== -1){
      this.articles.splice(artInd, 1)
      this.notifyObservers()
    }
  }
}

export { Subject, Newsletter }
