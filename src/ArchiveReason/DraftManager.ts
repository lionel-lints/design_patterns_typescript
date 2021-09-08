// The draft manager's responsibility is to implement the associated use cases and fire off the task upon
// valid state.

type archiveReason = {
  _id: string;
  isActive: boolean;
  text: string;
  automationWorkflowTriggerIds: string[];
  profileIds: string[];
  destinationProfileId?: string; // this id is where profileIds will be moved to
  destinationAutomationWorkflowTriggerId?: string; // where new triggers will be moved to
}

interface Draft {
  getOriginalState(): archiveReason[];
  getCurrState(): archiveReason[];

  // these are the 5 business cases or API we want to enable plus the execute method
  addNewArchiveReason(draft: archiveReason): void;
  enableArchiveReason(archiveReasonId: string): void;
  disableArchiveReason(archiveReasonId: string): void;
  editArchiveReason(archiveReasonId: string, newText: string): void;
  reorderArchiveReasons(currInd: number, destinationIndex: number): void;
  execute(): void
}

class DraftManager implements Draft {
  private originalData: archiveReason[] 

  constructor(private archiveReasonList: archiveReason[]){
    this.archiveReasonList = this._deepCopyList(archiveReasonList); // deep copy external creation data for Immutability barrier
    this.originalData = this._deepCopyList(archiveReasonList); 
  }

  getOriginalState(){
    return this.originalData;
  }

  getCurrState(){
    return this.archiveReasonList;
  }

  private _updateCurrState(arr: archiveReason[]){
      this.archiveReasonList = arr; 
  }

  private _updateArchiveReason(draft: archiveReason){
    const updatedList = this._shallowCopyList(this.getCurrState());
    const currInd = this._getIndexOfElementById(draft._id);
    updatedList[currInd] = this._shallowCopyObject(draft);

    this._updateCurrState(updatedList);
  }

  _archiveReasonHasUniqueText(ar:archiveReason){
    return this.archiveReasonList.every((a) => a._id === ar._id || a.text !== ar.text);
  }

  addNewArchiveReason(draft: archiveReason){
    if(
      this._archiveReasonHasUniqueText(draft) &&
      this._getIndexOfElementById(draft._id) === -1
    ){
      this._updateCurrState(this._safeUnshift(this.getCurrState(), draft));
    }
  }

  editArchiveReason(archiveReasonId: string, newText: string){
    const currInd = this._getIndexOfElementById(archiveReasonId);
    let draft;

    if(currInd >= 0){
      draft = this._shallowCopyObject(this.getCurrState()[currInd]);
      draft.text = newText;
    }

    if(draft && this._archiveReasonHasUniqueText(draft)){
      this._updateArchiveReason(draft);
    }
  }

  enableArchiveReason(archiveReasonId: string){
    const currInd = this._getIndexOfElementById(archiveReasonId);
    if(currInd >= 0){
      const draft = this._shallowCopyObject(this.getCurrState()[currInd]);
      draft.isActive = true;

      this._updateArchiveReason(draft);
    }
  }

  disableArchiveReason(
    archiveReasonId: string,
    destinationForProfilesId?: string,
    destinationForAutomationWorkflowTriggersId?: string,
  ){
    const currInd = this._getIndexOfElementById(archiveReasonId);
    if(currInd >= 0){
      const draft = this._shallowCopyObject(this.getCurrState()[currInd]);
      draft.isActive = false;
      if(destinationForProfilesId !== undefined){
        draft.destinationProfileId = destinationForProfilesId;
      }
      if(destinationForAutomationWorkflowTriggersId !== undefined){
        draft.destinationAutomationWorkflowTriggerId = destinationForAutomationWorkflowTriggersId;
      }
      this._updateArchiveReason(draft);
    }
  }

  reorderArchiveReasons(currInd: number, destinationIndex: number){
    let updatedList = this._shallowCopyList(this.getCurrState());
    const archiveReasonToMoveArr = updatedList.splice(currInd, 1)
    updatedList = [
      ...updatedList.splice(0, destinationIndex),
      ...archiveReasonToMoveArr,
      ...updatedList.splice(destinationIndex)
    ]
    this._updateCurrState(updatedList);
  }

  execute(){
    // curious what your thinking about how this would look? We have the list, though it is only partially validated. 
    // we could validate the whole list, then loop through and fire an associated task for each item in the list.
  }

  _deepCopyList(arr:archiveReason[]){
    // TODO: this is just a stub, we can probably use a deepcopy implementation like underscore or whatever.
    return JSON.parse(JSON.stringify(arr));
  }

  _shallowCopyList(arr:archiveReason[]){
    return arr.slice()
  }

  _shallowCopyObject(obj:archiveReason){
    return { ...obj }
  }

  _safePush(arr: archiveReason[], archReas: archiveReason){
    const copy = this._shallowCopyList(arr);
    copy.push(archReas);
    return copy;
  }

  _safeUnshift(arr: archiveReason[], archReas: archiveReason){
    const copy = this._shallowCopyList(arr);
    copy.unshift(archReas);
    return copy;
  }

  _getIndexOfElementById(archiveReasonId: string){
    return this.getCurrState().findIndex((currAR) => currAR._id === archiveReasonId);
  }

}

export { DraftManager }
