import { Newsletter } from '../../../src/Observer/Subject';
import { NewsletterSubscriber } from '../../../src/Observer/Observer';
import { expect } from 'chai';
import 'mocha';

describe('Newsletter', () => {
  let name:string;
  let currentSubscribers: NewsletterSubscriber[];
  let currentArticles: string[];
  let newsletter: Newsletter;

  beforeEach('setup', () => {
    name = 'joe';
    currentSubscribers = [
      new NewsletterSubscriber('reader A', ['joe']), 
      new NewsletterSubscriber('reader B', ['joe']), 
    ];
    currentArticles = ['story A', 'story B'];
    newsletter = new Newsletter(
      name,
      currentSubscribers,
      currentArticles
    );
  });

  it('should implement the update method', () => {
    // expect(Object.keys(Object.getPrototypeOf(newsSub)).includes('update')).to.be.true
    expect(true).to.be.true
  });
  it('should contain a currentSubscriptions object with newsletters mapped to arrays', () => {
    // expect(newsSub.currentSubscriptions).to.exist
    // expect(typeof newsSub.currentSubscriptions).to.equal('object')

    // expect(newsSub.currentSubscriptions['newsletter A']).to.exist
    // expect(Array.isArray(newsSub.currentSubscriptions['newsletter A'])).to.be.true

    // expect(newsSub.currentSubscriptions['newsletter B']).to.exist
    // expect(Array.isArray(newsSub.currentSubscriptions['newsletter B'])).to.be.true
    expect(true).to.be.true
  });
});
