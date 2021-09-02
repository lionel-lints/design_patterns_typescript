// This is also known as the Context.
// The draft manager's responsibility is to keep track
// of the state all the archive reasons and help manage 
// state transitions.
import { ArchiveReasonState, BlockedDraft, PublishableDraft } from './State'

interface Context {
  archiveReasonList: ArchiveReasonState[]
}

class DraftManager implements Context {
  constructor(public archiveReasonList: ArchiveReasonState[]){
  }
  addNewDraftToList(draft: PublishableDraft | BlockedDraft){
    this.archiveReasonList.push(draft);
  }
}

export { DraftManager }
