
interface Composite {
  check(id: Permission['id']): void;
  uncheck(id: Permission['id']): void;
}

interface PermissionInterface {
  enable(id: Permission['id']): void;
  disable(id: Permission['id']): void;
}

class Permission implements Composite, PermissionInterface {
  constructor(
    public id: string,
    public isChecked: boolean,
    public isEnabled: boolean,
    public displayText: string,
    public helperText: string,
    public requiredPermissionIds: string[]=[],
  ){
  }

  check(id: Permission['id']): void {
    if(this.id !== id || this.isEnabled === false) return;
    this.isChecked = true;
  }

  uncheck(id: Permission['id']): void {
    if(this.requiredPermissionIds.includes(id)){
      this.disable(this.id);
      this.isChecked = false;
    }
    if(this.id !== id) return;
    this.isChecked = false;
  }

  enable(){
  }

  disable(id: Permission['id']): void {
    if(this.id !== id) return;
    this.isEnabled = false
  }
}


class PermissionWithGroup implements Composite {
  children: (Permission | PermissionWithGroup)[] = [];
  constructor(
    public id: string,
    public isChecked: boolean,
    public isEnabled: boolean,
    public displayText: string,
    public helperText: string,
    public requiredPerrmissionIds: string[]=[],
  ){
  }

  check(id: Permission['id']): void {
  }

  uncheck(id: Permission['id']): void {
  }

  enable(){
  }

  disable(){
  }
}

class Category implements Composite {
  children: (Permission | PermissionWithGroup | Category)[] = [];
  constructor(
  ){
  }

  check(id: Permission['id']): void {
  }

  uncheck(id: Permission['id']): void {
  }

  enable(){
  }

  disable(){
  }
}

export { Permission, PermissionWithGroup, Category };
