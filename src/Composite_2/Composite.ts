
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
    const shouldEnable = this.requiredPermissionIds.includes(id);
    if(shouldEnable){
      this.enable(this.id)
    } else if(this.id === id && this.isEnabled){
      this.isChecked = true;
    }
  }

  uncheck(id: Permission['id']): void {
    const shouldDisable = this.requiredPermissionIds.includes(id);
    if(this.id !== id && !shouldDisable) return;
    this.isChecked = false;
    if(shouldDisable){
      this.disable(this.id);
    }
  }

  enable(id: Permission['id']): void {
    if(this.id !== id) return;
    this.isEnabled = true; 
  }

  disable(id: Permission['id']): void {
    if(this.id !== id) return;
    this.isEnabled = false;
  }
}


class PermissionWithGroup extends Permission {
  children: (Permission | PermissionWithGroup)[] = [];
  constructor(
    public id: string,
    public isChecked: boolean,
    public isEnabled: boolean,
    public displayText: string,
    public helperText: string,
    public requiredPerrmissionIds: string[]=[],
  ){
    super(
      id,
      isChecked,
      isEnabled,
      displayText,
      helperText,
      requiredPerrmissionIds,
    );
  }

  check(id: Permission['id']): void {
    const shouldEnable = this.requiredPermissionIds.includes(id);
    if(shouldEnable){
      this.enable(this.id)
    } else if(this.id === id && this.isEnabled){
      this.isChecked = true;
    }
    this.children.forEach(child => child.check(id));
  }

  uncheck(id: Permission['id']): void {
    const shouldDisable = this.requiredPermissionIds.includes(id);
    if(this.id !== id && !shouldDisable) return;
    this.isChecked = false;
    if(shouldDisable){
      this.disable(this.id);
    }
    this.children.forEach(child => child.uncheck(id));
  }
}

class Category implements Composite {
  children: (Permission | PermissionWithGroup | Category)[] = [];
  constructor(
  ){
  }

  check(id: Permission['id']): void {
    this.children.forEach(child => child.check(id));
  }

  uncheck(id: Permission['id']): void {
    this.children.forEach(child => child.uncheck(id));
  }
}

export { Permission, PermissionWithGroup, Category };
