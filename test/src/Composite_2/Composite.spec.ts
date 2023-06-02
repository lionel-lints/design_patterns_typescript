import {
  Permission,
  PermissionWithGroup,
  Category
} from '../../../src/Composite_2/Composite';
import { assert, expect } from 'chai';

describe('Permission', () => {
  let permissionClass = Permission

  it('imports correctly', () => {
    expect(permissionClass).to.exist;
  });

  describe('check', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a1',
        false,
        true,
        'first posting permissions',
        '',
        ['a requirement id'],
      );
    })

    it('checks when id matches and enabled', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.true;
    });

    it('does not check when disabled', () => {
      permission.isEnabled = false;
      expect(permission.isChecked).to.be.false;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.false;
      permission.isEnabled = true;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.true;
    });

    it('enables but does not check if requiredId is passed', () => {
      permission.isEnabled = false;
      expect(permission.isEnabled).to.be.false;
      expect(permission.isChecked).to.be.false;
      permission.check('a requirement id');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
    });

    it('ignores ids that are not required or self', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
    })
  });

  describe('uncheck', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        true,
        true,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })

    it('unchecks when id matches', () => {
      expect(permission.isChecked).to.be.true;
      permission.uncheck(permission.id);
      expect(permission.isChecked).to.be.false;
    })

    it('unchecks when requiredPermission matches', () => {
      expect(permission.isChecked).to.be.true;
      permission.uncheck('postings.a1');
      expect(permission.isChecked).to.be.false;
    })

    it('disables when requiredPermission matches', () => {
      expect(permission.isEnabled).to.be.true;
      permission.uncheck('postings.a1');
      expect(permission.isEnabled).to.be.false;
    })

    it('does not disable when requiredPermission does not match', () => {
      expect(permission.isEnabled).to.be.true;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      permission.uncheck(permission.id);
      expect(permission.isEnabled).to.be.true;
    })

    it('ignores ids that are not required or self', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.true;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.true;
    })
  });

  describe('enable', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        false,
        false,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })
    it('ignores ids that are not itself', () => {
      expect(permission.isEnabled).to.be.false;
      permission.enable('random');
      expect(permission.isEnabled).to.be.false;
    });
    it('enables for an id that is itself', () => {
      expect(permission.isEnabled).to.be.false;
      permission.enable(permission.id);
      expect(permission.isEnabled).to.be.true;
    });
  });
  describe('disable', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        true,
        true,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })
    it('ignores ids that are not itself', () => {
      expect(permission.isEnabled).to.be.true;
      permission.disable('random');
      expect(permission.isEnabled).to.be.true;
    });

    it('disables for an id that is itself', () => {
      expect(permission.isEnabled).to.be.true;
      permission.disable(permission.id);
      expect(permission.isEnabled).to.be.false;
    });
  });
});
describe('PermissionWithGroup', () => {
  let permissionWGClass = PermissionWithGroup

  it('imports correctly', () => {
    expect(permissionWGClass).to.exist;
  });

  describe('check', () => {
    let permission1:Permission;
    let permission2:Permission;
    let permissionWG:PermissionWithGroup;

    beforeEach('setup', () => {
      permission1 = new Permission(
        'postings.a1',
        false,
        false,
        'first posting permissions',
        '',
        ['a requirement id'],
      );
      permission2 = new Permission(
        'postings.a2',
        false,
        false,
        'second posting permissions',
        '',
        ['a requirement id'],
      );
      permissionWG = new PermissionWithGroup(
        'a requirement id',
        false,
        true
        'postings special',
        '',
        [permissions1, permissions2]
      );
    })

    it('checks when id matches and enabled', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.true;
    });

    it('does not check when disabled', () => {
      permission.isEnabled = false;
      expect(permission.isChecked).to.be.false;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.false;
      permission.isEnabled = true;
      permission.check(permission.id);
      expect(permission.isChecked).to.be.true;
    });

    it('enables but does not check if requiredId is passed', () => {
      permission.isEnabled = false;
      expect(permission.isEnabled).to.be.false;
      expect(permission.isChecked).to.be.false;
      permission.check('a requirement id');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
    });

    it('ignores ids that are not required or self', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.false;
    })
  });

  describe('uncheck', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        true,
        true,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })

    it('unchecks when id matches', () => {
      expect(permission.isChecked).to.be.true;
      permission.uncheck(permission.id);
      expect(permission.isChecked).to.be.false;
    })

    it('unchecks when requiredPermission matches', () => {
      expect(permission.isChecked).to.be.true;
      permission.uncheck('postings.a1');
      expect(permission.isChecked).to.be.false;
    })

    it('disables when requiredPermission matches', () => {
      expect(permission.isEnabled).to.be.true;
      permission.uncheck('postings.a1');
      expect(permission.isEnabled).to.be.false;
    })

    it('does not disable when requiredPermission does not match', () => {
      expect(permission.isEnabled).to.be.true;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      permission.uncheck(permission.id);
      expect(permission.isEnabled).to.be.true;
    })

    it('ignores ids that are not required or self', () => {
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.true;
      permission.uncheck('random');
      expect(permission.isEnabled).to.be.true;
      expect(permission.isChecked).to.be.true;
    })
  });

  describe('enable', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        false,
        false,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })
    it('ignores ids that are not itself', () => {
      expect(permission.isEnabled).to.be.false;
      permission.enable('random');
      expect(permission.isEnabled).to.be.false;
    });
    it('enables for an id that is itself', () => {
      expect(permission.isEnabled).to.be.false;
      permission.enable(permission.id);
      expect(permission.isEnabled).to.be.true;
    });
  });
  describe('disable', () => {
    let permission:Permission;
    beforeEach('setup', () => {
      permission = new Permission(
        'postings.a2',
        true,
        true,
        'second posting permissions',
        '',
        ['postings.a1'],
      );
    })
    it('ignores ids that are not itself', () => {
      expect(permission.isEnabled).to.be.true;
      permission.disable('random');
      expect(permission.isEnabled).to.be.true;
    });
    it('disables for an id that is itself', () => {
      expect(permission.isEnabled).to.be.true;
      permission.disable(permission.id);
      expect(permission.isEnabled).to.be.false;
    });
  });
});
