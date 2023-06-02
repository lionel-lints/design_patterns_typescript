
interface Composite {
  check(id: Permission['id']): void;
  uncheck(id: Permission['id']): void;
}

interface PermissionInterface {
  enable() void;
  disable() void;
}

class Permission implements Composite, PermissionInterface {
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


class PermissionWithGroup implements Composite {
  children = (Permission | PermissionWithGroup)[] = [];
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
  children = (Permission | PermissionWithGroup | Category)[] = [];
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
