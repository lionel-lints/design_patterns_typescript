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
        [],
      );
    })
    it('checks when enabled', () => {
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
    it('ignores ids other than itself', () => {
      expect(permission.isChecked).to.be.false;
      permission.check('something');
      expect(permission.isChecked).to.be.false;
    });
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
    })
    it('ignores ids that are not required or self', () => {
    })
    // it('does not check when disabled', () => {
    //   permission.isEnabled = false;
    //   expect(permission.isChecked).to.be.false;
    //   permission.check(permission.id);
    //   expect(permission.isChecked).to.be.false;
    //   permission.isEnabled = true;
    //   permission.check(permission.id);
    //   expect(permission.isChecked).to.be.true;
    // });
    // it('ignores ids other than itself', () => {
    //   expect(permission.isChecked).to.be.false;
    //   permission.check('something');
    //   expect(permission.isChecked).to.be.false;
    // });
  });
});
