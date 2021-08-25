interface Observer {
  currentSubscriptions: { [newsletters: string]: string[]};
  update (subscriptionName: string, currentArticles: string[], unsubscribe: boolean): void;
}

class NewsletterSubscriber implements Observer {
  currentSubscriptions: { [newsletters: string]: string[]} = {}
  constructor(public name: string, private currentSubNames: string[]){
    currentSubNames.forEach((sub:string) => {
      this.currentSubscriptions[sub] = []
    })

  }
  update(subscriptionName: string, currentArticles: string[], unsubscribe:boolean){
    this.currentSubscriptions[subscriptionName] = currentArticles;
    if(unsubscribe === true){
      delete this.currentSubscriptions[subscriptionName]
    }
  }
}

export { Observer, NewsletterSubscriber }
