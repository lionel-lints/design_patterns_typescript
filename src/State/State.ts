interface DocumentState {
  executeQueryPlan (): Error | void;
  toggleLock(): DocumentState;
  update(newText: string): LockedOriginalDocument | LockedEditedDocument | EditableEditedDocument;
}


class LockedOriginalDocument implements DocumentState {
  constructor(readonly text: string, readonly isLocked: true){
  }
  executeQueryPlan (){
    console.log('LockedOriginalDocument query plan --> no changes, so no query issued')
  }
  toggleLock(){
    return new EditableOriginalDocument(this.text, !this.isLocked)
  }
  update(newText: string){
    console.error(`It is not possible to update a LockedOriginalDocument with ${newText}, UNLOCK it FIRST`)
    return new LockedOriginalDocument(this.text, this.isLocked) 
  }
}

class EditableOriginalDocument implements DocumentState {
  constructor(readonly text: string, readonly isLocked: false){
  }
  executeQueryPlan (){
    console.log('EditableOriginalDocument query plan --> no changes, so no query issued')
  }
  toggleLock(){
    return new LockedOriginalDocument(this.text, !this.isLocked)
  }
  update(newText: string){
    return new EditableEditedDocument(newText, this.isLocked)
  }
}

class LockedEditedDocument implements DocumentState {
  constructor(readonly text: string, readonly isLocked: true){
  }
  executeQueryPlan (){
    console.log('LockedEditedDocument query plan would be issued!')
  }
  toggleLock(){
    return new EditableEditedDocument(this.text, !this.isLocked)
  }
  update(newText: string){
    console.error(`It is not possible to update a LockedOriginalDocument with ${newText}`)
    return new LockedOriginalDocument(this.text, this.isLocked) 
  }
}

class EditableEditedDocument implements DocumentState {
  constructor(readonly text: string, readonly isLocked: false){
  }
  executeQueryPlan (){
    console.log('EditableEditedDocument query plan would be issued!')
  }
  toggleLock(){
    return new LockedEditedDocument(this.text, !this.isLocked);
  }
  update(newText: string){
    return new EditableEditedDocument(newText, this.isLocked)
  }
}

export {
  LockedOriginalDocument,
  EditableOriginalDocument,
  LockedEditedDocument,
  EditableEditedDocument,
}

