import { Observer, NewsletterSubscriber } from '../../../src/Observer/Observer';
import { expect } from 'chai';
import 'mocha';

describe('NewsletterSubscriber', () => {
  let name:string;
  let currentSubs: string[];
  let newsSub: NewsletterSubscriber;

  beforeEach('setup', () => {
    name = 'joe';
    currentSubs = ['newsletter A', 'newsletter B'];
    newsSub = new NewsletterSubscriber(
      name,
      currentSubs
    );
  });

  it('should implement the update method', () => {
    expect(Object.keys(Object.getPrototypeOf(newsSub)).includes('update')).to.be.true
  });
  it('should contain a currentSubscriptions object with newsletters mapped to arrays', () => {
    expect(newsSub.currentSubscriptions).to.exist
    expect(typeof newsSub.currentSubscriptions).to.equal('object')

    expect(newsSub.currentSubscriptions['newsletter A']).to.exist
    expect(Array.isArray(newsSub.currentSubscriptions['newsletter A'])).to.be.true

    expect(newsSub.currentSubscriptions['newsletter B']).to.exist
    expect(Array.isArray(newsSub.currentSubscriptions['newsletter B'])).to.be.true
  });
});
describe('Hello function', () => {


});
