// state.spec.ts
import {
  archiveReason,
  PublishedDocument,
  PublishableDraft,
  BlockedDraft,
} from '../../../src/ArchiveReasons/State';
import { expect } from 'chai';
import 'mocha';

describe('PublishedDocument', () => {
  let _id: string;
  let isActive:boolean;
  let text: string;
  let automationWorkflowTriggerIds: string[];
  let profileIds: string[];
  let newArchiveReason: archiveReason;
  let doc: PublishedDocument | BlockedDraft | PublishableDraft;
  beforeEach('setup', () => {
    _id =  'test-id';
    isActive = true;
    text = 'name of some archiveReason';
    automationWorkflowTriggerIds = ['triggerId a', 'triggerId b'];
    profileIds = ['profileId a', 'profileId b'];
    newArchiveReason = { _id, isActive, text, automationWorkflowTriggerIds, profileIds }
    doc = new PublishedDocument(newArchiveReason)
  });

  it('should implement the getOriginalState method', () => {
    expect(doc.getOriginalState()).to.equal(newArchiveReason)
  });
  it('should implement the getCurrState method', () => {
    expect(doc.getCurrState()).to.equal(newArchiveReason)
  });
  it('should implement the executeTask method', () => {
    expect(doc.executeTask()).to.be.undefined
    expect(doc.executeTask).to.exist
  });
  it('should implement the toggleActiveState method', () => {
    expect(doc.toggleActiveState).to.exist
    expect(doc.getCurrState()['isActive']).to.equal(isActive)
    doc = doc.toggleActiveState()
    expect(doc.getCurrState()['isActive']).not.to.equal(isActive)
  });
  it('should implement the updateText method', () => {
    expect(doc.updateText).to.exist
    expect(doc.getCurrState()['text']).to.equal(text)
    const newText = 'hello new world'
    doc = doc.updateText(newText)
    expect(doc.getCurrState()['text']).not.to.equal(text)
    expect(doc.getCurrState()['text']).to.equal(newText)
  });
});

describe('BlockedDraft', () => {
  let _id: string;
  let isActive:boolean;
  let text: string;
  let automationWorkflowTriggerIds: string[];
  let profileIds: string[];
  let originalArchiveReason: archiveReason;
  let newArchiveReason: archiveReason;
  let doc: PublishedDocument | BlockedDraft | PublishableDraft;
  beforeEach('setup', () => {
    _id =  'test-id';
    isActive = true;
    text = 'name of some archiveReason';
    automationWorkflowTriggerIds = ['triggerId a', 'triggerId b'];
    profileIds = ['profileId a', 'profileId b'];
    originalArchiveReason = { _id, isActive, text, automationWorkflowTriggerIds, profileIds }
    newArchiveReason = { _id, isActive:false, text:'some changed text', automationWorkflowTriggerIds, profileIds }
    doc = new BlockedDraft(newArchiveReason, originalArchiveReason)
  });

  it('should implement the getOriginalState method', () => {
    expect(doc.getOriginalState()).to.equal(originalArchiveReason)
  });
  it('should implement the getCurrState method', () => {
    expect(doc.getCurrState()).to.equal(newArchiveReason)
  });
  it('should implement the executeTask method', () => {
    expect(doc.executeTask).to.throw()
    expect(doc.executeTask).to.exist
  });
  it('should implement the toggleActiveState method', () => {
    expect(doc.toggleActiveState).to.exist
    expect(doc.getCurrState()['isActive']).not.to.equal(isActive)
    doc = doc.toggleActiveState()
    expect(doc.getCurrState()['isActive']).to.equal(isActive)
    expect(doc).to.be.an.instanceOf(BlockedDraft)
  });
  it('should implement the updateText method', () => {
    expect(doc.updateText).to.exist
    expect(doc.getCurrState()['text']).to.equal('some changed text')
    expect(doc.getOriginalState()['text']).to.equal(text)
    const newText = 'hello new world'
    doc = doc.updateText(newText)
    expect(doc.getCurrState()['text']).not.to.equal('some changed text')
    expect(doc.getCurrState()['text']).to.equal(newText)
    expect(doc.getOriginalState()['text']).to.equal(text)
    expect(doc).to.be.an.instanceOf(BlockedDraft)
  });
});

describe('PublishableDraft', () => {
  let _id: string;
  let isActive:boolean;
  let text: string;
  let automationWorkflowTriggerIds: string[];
  let profileIds: string[];
  let originalArchiveReason: archiveReason;
  let newArchiveReason: archiveReason;
  let doc: PublishedDocument | BlockedDraft | PublishableDraft;
  beforeEach('setup', () => {
    _id =  'test-id';
    isActive = true;
    text = 'name of some archiveReason';
    automationWorkflowTriggerIds = [];
    profileIds = [];
    originalArchiveReason = { _id, isActive, text, automationWorkflowTriggerIds, profileIds }
    newArchiveReason = { _id, isActive:false, text:'some changed text', automationWorkflowTriggerIds, profileIds }
    doc = new PublishableDraft(newArchiveReason, originalArchiveReason)
  });

  it('should implement the getOriginalState method', () => {
    expect(doc.getOriginalState()).to.equal(originalArchiveReason)
  });
  it('should implement the getCurrState method', () => {
    expect(doc.getCurrState()).to.equal(newArchiveReason)
  });
  it('should implement the executeTask method', () => {
    expect(doc.executeTask()).to.be.undefined
    expect(doc.executeTask).to.exist
  });
  it('should implement the toggleActiveState method', () => {
    expect(doc.toggleActiveState).to.exist
    expect(doc.getCurrState()['isActive']).not.to.equal(isActive)
    doc = doc.toggleActiveState()
    expect(doc.getCurrState()['isActive']).to.equal(isActive)
    expect(doc).to.be.an.instanceOf(PublishableDraft)
  });
  it('should implement the updateText method', () => {
    expect(doc.updateText).to.exist
    expect(doc.getCurrState()['text']).to.equal('some changed text')
    expect(doc.getOriginalState()['text']).to.equal(text)
    const newText = 'hello new world'
    doc = doc.updateText(newText)
    expect(doc.getCurrState()['text']).not.to.equal('some changed text')
    expect(doc.getCurrState()['text']).to.equal(newText)
    expect(doc.getOriginalState()['text']).to.equal(text)
    expect(doc).to.be.an.instanceOf(PublishableDraft)
  });
});
