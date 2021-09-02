// This is also known as the Context.
// The draft manager's responsibility is to keep track
// of the state all the archive reasons and help manage 
// state transitions.
import { ArchiveReasonState, BlockedDraft, PublishableDraft } from './State'

interface Context {
  archiveReasonList: ArchiveReasonState[];
  archiveReasonOrderHasChanged: boolean;
}

class DraftManager implements Context {
  public archiveReasonOrderHasChanged
  constructor(public archiveReasonList: ArchiveReasonState[]){
    this.archiveReasonOrderHasChanged = false;
  }

  addNewDraftToList(draft: PublishableDraft | BlockedDraft){
    this.archiveReasonOrderHasChanged = true;
    this.archiveReasonList.push(draft);
  }

  reorderDraft(currInd: number, destinationIndex: number){
    this.archiveReasonOrderHasChanged = true;
    let poppedOutDraft = this.archiveReasonList.splice(currInd, 1)[0];
    this.archiveReasonList.splice(destinationIndex, 0, poppedOutDraft);
  }

  executeChanges(){
    if(isValidToQuery(this.archiveReasonList)){
      this.archiveReasonList.map((archiveReason) => archiveReason.executeTask())
    }
  }

}

const isValidToQuery = (arr: ArchiveReasonState[]) => {
  return arr.some((archiveReason) => archiveReason._isBlocked()) === false
}

export { DraftManager }
