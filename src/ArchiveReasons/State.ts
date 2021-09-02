// this is the State interface and the set of
// concreteStates each of them store a reference to the draftManager
// they are created by the Derby component and passed
// to the draftManager to handle state transitions
// the archive reason data will look like this:
 
import { DraftManager } from './DraftManager'

type archiveReason = {
  _id: string;
  isActive: boolean;
  text: string;
  automationWorkflowTriggerIds: string[];
  profileIds: string[];
  bulkMoveDestinationIds?: {
    profileId?: string; // this id is where profileIds will be moved to
    automationWorkflowTriggerId?: string; // where new triggers will be moved to
  }
}
 

interface ArchiveReasonState {
  draftManager?: DraftManager;
  getOriginalState(): archiveReason;
  getCurrState(): archiveReason;
  executeTask (): void | Error;  // fires the taskqueue task or DB update, depending on the concreteState
  toggleActiveState(): PublishedDocument | PublishableDraft | BlockedDraft; // toggles the active status of an archive reason
  updateText(newText: string): PublishedDocument | PublishableDraft | BlockedDraft;
}

class PublishedDocument implements ArchiveReasonState {
  private originalData: archiveReason
  constructor(private currData: archiveReason){
    this.originalData = currData
  }

  getOriginalState(){
    return this.originalData;
  }

  getCurrState(){
    return this.currData;
  }

  executeTask() {
    // document matches the published state, no query required
    // just return void
    console.log('published document needs no query, this function wont call anything, just return undefined')
  }

  _isBlocked(){
    return this.currData.profileIds.length > 0 || this.currData.automationWorkflowTriggerIds.length > 0;
  }

  _returnNewInstance(data: archiveReason){
    if(JSON.stringify(data) === JSON.stringify(this.getOriginalState())){
      return new PublishedDocument(data);
    } else if(this._isBlocked() === true){
      return new BlockedDraft(data, this.getOriginalState());
    } else {
      // draft data and not currently blocked
      return new PublishableDraft(data, this.getOriginalState());
    }
  }

  toggleActiveState(){
    const currState = { ...this.currData };
    currState.isActive = !currState.isActive;

    return this._returnNewInstance(currState)
  }

  updateText(newText: string){
    const currState = { ...this.currData };
    currState.text= newText;
    // all documents can update the text from a published Document:
    return this._returnNewInstance(currState)
  }
}

class PublishableDraft implements ArchiveReasonState {
  constructor(
    private currData: archiveReason,
    private originalData: archiveReason
  ){}

  getOriginalState(){
    return this.originalData;
  }

  getCurrState(){
    return this.currData;
  }

  executeTask() {
    // no direct return,
    // we just fire off the associated query as a side effect here
    console.log('PublishableDraft query will be executed like this console.log')
  }

  _isBlocked(){
    return this.currData.profileIds.length > 0 || this.currData.automationWorkflowTriggerIds.length > 0;
  }

  _returnNewInstance(data: archiveReason){
    if(JSON.stringify(data) === JSON.stringify(this.getOriginalState())){
      return new PublishedDocument(data);
    } else if(this._isBlocked() === true){
      return new BlockedDraft(data, this.getOriginalState());
    } else {
      return new PublishableDraft(data, this.getOriginalState());
    }
  }

  toggleActiveState(){
    const currState = { ...this.currData };
    currState.isActive = !currState.isActive;

    return this._returnNewInstance(currState)
  }

  updateText(newText: string){
    const currState = { ...this.currData };
    currState.text= newText;
    // all documents can update the text from a published Document:
    return this._returnNewInstance(currState)
  }
}

class BlockedDraft implements ArchiveReasonState {
  constructor(
    private currData: archiveReason,
    private originalData: archiveReason
  ){}

  getOriginalState(){
    return this.originalData;
  }

  getCurrState(){
    return this.currData;
  }

  executeTask() {
    throw new Error('blocked task cannot be queried')
  }

  _isBlocked(){
    return this.currData.profileIds.length > 0 || this.currData.automationWorkflowTriggerIds.length > 0;
  }

  _returnNewInstance(data: archiveReason){
    if(JSON.stringify(data) === JSON.stringify(this.getOriginalState())){
      return new PublishedDocument(data);
    } else if(this._isBlocked() === true){
      return new BlockedDraft(data, this.getOriginalState());
    } else {
      return new PublishableDraft(data, this.getOriginalState());
    }
  }

  toggleActiveState(){
    const currState = { ...this.currData };
    currState.isActive = !currState.isActive;

    return this._returnNewInstance(currState)
  }

  updateText(newText: string){
    const currState = { ...this.currData };
    currState.text = newText;
    // all documents can update the text from a published Document:
    return this._returnNewInstance(currState)
  }
}

export {
  archiveReason,
  ArchiveReasonState,
  PublishedDocument,
  PublishableDraft,
  BlockedDraft,
}

