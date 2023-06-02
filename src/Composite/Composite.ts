
interface PermissionInterface {
  check(id: Permission['id']): void;
  uncheck(id: Permission['id']): void;
  getHelperText(): string;
}


class Category implements PermissionInterface {
  permissionIds: Set<string> = new Set();
  children: (Category | Permission | PermissionWithGroup)[] = [];
  helperText: string = '';

  constructor(){
  }

  check(id: Permission['id']){
    this.children.forEach((child) => {
      child.check(id);
    });
  }

  uncheck(id: Permission['id']){
    this.children.forEach((child) => {
      child.uncheck(id);
    });
  }

  getHelperText(){
    let permissionIds = this.children.map((child) => {
      child.getHelperText();
    });
    return '';
  }
}


class PermissionWithGroup implements PermissionInterface {
  children: Permission[] = [];

  constructor(
    public id: string,
    public displayText: string,
    public helperText: string,
    public isChecked: boolean,
    public isDisabled: boolean,
    public requiredPermissionIds: string[],
  ){
  }

  enable(){
    this.isDisabled = false;
  }

  disable(){
    this.isDisabled = false;
    this.isChecked = false;
    this.children.forEach((child) => {
      child.disable();
    });
  }

  check(id: Permission['id']){
    if(this.requiredPermissionIds.includes(id)) this.enable();
    if(this.isDisabled === true || this.id !== id) return;
    this.isChecked = true;
    this.children.forEach((child) => {
      child.enable();
    });
  }

  uncheck(id: Permission['id']){
    if(this.requiredPermissionIds.includes(id)) this.disable();
    if(this.id !== id) return;
    this.isChecked = false;
    this.children.forEach((child) => {
      child.disable();
    });
  }

  getHelperText(){
    return '';
  }
}


class Permission implements PermissionInterface {
  constructor(
    public id: string,
    public displayText: string,
    public helperText: string,
    public isChecked: boolean,
    public isDisabled: boolean,
    public requiredPermissionIds: string[],
  ){
  }

  enable(){
    this.isDisabled = false;
  }

  disable(){
    this.isDisabled = true;
    this.isChecked = false;
  }

  check(id: Permission['id']){
    if(this.requiredPermissionIds.includes(id)) this.enable();
    if(this.isDisabled === true || this.id !== id) return;
    this.isChecked = true;
  }

  uncheck(id: Permission['id']){
    if(this.requiredPermissionIds.includes(id)) this.disable();
    if(this.id !== id) return;
    this.isChecked = false;
  }

  getHelperText(){
    return this.requiredPermissionIds;
  }
}

