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
  moveArchiveReason(archiveReasonId: string, destinationIndex: number): void;
  execute(): void
}

class ArchiveReasonDraftManager implements Draft {
  private originalData: archiveReason[] 

  constructor(private archiveReasonList: archiveReason[]){
    this.archiveReasonList = this._deepCopyList(archiveReasonList); // deep copy external creation data for Immutability barrier
    this.originalData = this._deepCopyList(archiveReasonList); 
  }

  // public getters
  getOriginalState(){
    return this.originalData;
  }

  getCurrState(){
    return this.archiveReasonList;
  }

  // BUSINESS RULES
  addNewArchiveReason(draft: archiveReason){
    if(this.isAnArchiveReason(draft._id) === false && this.hasUniqueText(draft)){
      this.createArchiveReason(draft);
    }
  }
  editArchiveReason(archiveReasonId: string, newText: string){
    if(this.isAnArchiveReason(archiveReasonId)){
      const draft: archiveReason = this.getCopyById(archiveReasonId);
      draft.text = newText;
      if(this.hasUniqueText(draft)){
        this.updateText(draft);
      }
    }
  }
  enableArchiveReason(archiveReasonId: string){
    if(this.isAnArchiveReason(archiveReasonId)){
      const draft: archiveReason = this.getCopyById(archiveReasonId);
      this.updateActive(draft);
    }
  }
  disableArchiveReason(
    archiveReasonId: string,
    destinationForProfilesId?: string,
    destinationForAutomationWorkflowTriggersId?: string,
  ){
    if(this.isAnArchiveReason(archiveReasonId)){
      const draft: archiveReason = this.getCopyById(archiveReasonId);
      this.updateNotActive(draft, { destinationForProfilesId, destinationForAutomationWorkflowTriggersId });
    }
  }
  moveArchiveReason(archiveReasonId: string, destinationIndex: number){
    if(this.isAnArchiveReason(archiveReasonId)){
      this.moveDraftToLocation(archiveReasonId, destinationIndex);
    }
  }
  execute(){
    if(this.allArchiveReasonsAreValid()){
      this.runAllUpdates();
    } else {
      throw new Error('some archives are not validated, please fix and try again');
    }
  }

  //ABSTRACTION BARRIER -> this layer hides the implementation & structure of our data & algos
  private allArchiveReasonsAreValid(){
    // TODO: decide how to implement valid state
    // and return a boolean, this is just a stub
    return true;
  }
  private runAllUpdates(){
    // TODO: we need to determine which updates apply to which state for each
    // archive reason
  }
  private isAnArchiveReason(archiveReasonId: string){
    return this._getIndexById(archiveReasonId) >= 0
  }

  private createArchiveReason(draft: archiveReason){
    const updatedList = this._safeUnshift(draft);
    this._updateCurrState(updatedList);
  }

  private updateText(draft: archiveReason){
    this._updateArchiveReason(draft._id, 'text', draft.text);
  }

  private updateActive(draft: archiveReason){
    this._updateArchiveReason(draft._id, 'isActive', true);
  }

  private updateNotActive(
    draft: archiveReason,
    options?: {
      destinationForProfilesId?: string,
      destinationForAutomationWorkflowTriggersId?: string
    }
  ){
    if(options && options.destinationForProfilesId !== undefined){
      this._updateArchiveReason(draft._id, 'destinationForProfilesId', options.destinationForProfilesId);
    }
    if(options && options.destinationForAutomationWorkflowTriggersId !== undefined){
      this._updateArchiveReason(
        draft._id,
        'destinationAutomationWorkflowTriggerId',
        options.destinationForAutomationWorkflowTriggersId
      );
    }
    this._updateArchiveReason(draft._id, 'isActive', false);
  }

  private moveDraftToLocation(archiveReasonId: string, destinationIndex: number){
    const copy = this._shallowCopyList(this.getCurrState());
    const currIndex = this._getIndexById(archiveReasonId);
    const draft: archiveReason = copy[currIndex];
    copy.splice(currIndex, 1);
    copy.splice(destinationIndex, 0, draft);
    this._updateCurrState(copy);
  }

  private getCopyById(archiveReasonId: string){
    const curr = this.getCurrState();
    const ind = this._getIndexById(archiveReasonId);
    if(ind >= 0){
      return this._shallowCopyObject(curr[ind]);
    } else {
      throw new Error(`archiveReasonId: ${archiveReasonId} is not currently included in archiveReasons`);
    }
  }
  private hasUniqueText(ar:archiveReason){
    return this.getCurrState().every((a) => a._id === ar._id || a.text !== ar.text);
  }

  // BASE HELPERS -> these are the base implementations to enact our abstractions
  private _getIndexById(archiveReasonId: string){
    return this.getCurrState().findIndex((currAR) => currAR._id === archiveReasonId);
  }

  private _updateCurrState(arr: archiveReason[]){
    const updatedList = this._shallowCopyList(arr);
    this.archiveReasonList = updatedList; 
  }

  private _safeUnshift(archReas: archiveReason){
    const copy = this._shallowCopyList(this.getCurrState());
    copy.unshift(archReas);
    return copy;
  }

  // TODO: fix this type error with generics? I think that's what's needed here for draft[key] = value
  private _updateArchiveReason(
    archiveReasonId: string,
    key: 'text' | 'isActive' | 'destinationAutomationWorkflowTriggerId' | 'destinationForProfilesId',
    value: string | boolean
  ){
    const copy = this._shallowCopyList(this.getCurrState());
    const ind = this._getIndexById(archiveReasonId);
    if(ind >= 0){
      const draft: archiveReason = this._shallowCopyObject(copy[ind]);
      draft[key] = value;
      copy[ind] = draft;
      this._updateCurrState(copy);
    }
  }

  private _deepCopyList(arr:archiveReason[]){
    // TODO: this is just a stub, we can probably use a deepcopy implementation like underscore or whatever.
    return JSON.parse(JSON.stringify(arr));
  }

  private _shallowCopyList(arr:archiveReason[]){
    return arr.slice()
  }

  private _shallowCopyObject(obj:archiveReason){
    return { ...obj }
  }
}

export { ArchiveReasonDraftManager }
