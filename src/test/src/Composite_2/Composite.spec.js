"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Composite_1 = require("../../../src/Composite_2/Composite");
var chai_1 = require("chai");
describe('Permission', function () {
    var permissionClass = Composite_1.Permission;
    it('imports correctly', function () {
        chai_1.expect(permissionClass).to.exist;
    });
    describe('check', function () {
        var permission;
        beforeEach('setup', function () {
            permission = new Composite_1.Permission('postings.a1', false, true, 'first posting permissions', '', ['a requirement id']);
        });
        it('checks when id matches and enabled', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.false;
            permission.check(permission.id);
            chai_1.expect(permission.isChecked).to.be.true;
        });
        it('does not check when disabled', function () {
            permission.isEnabled = false;
            chai_1.expect(permission.isChecked).to.be.false;
            permission.check(permission.id);
            chai_1.expect(permission.isChecked).to.be.false;
            permission.isEnabled = true;
            permission.check(permission.id);
            chai_1.expect(permission.isChecked).to.be.true;
        });
        it('enables but does not check if requiredId is passed', function () {
            permission.isEnabled = false;
            chai_1.expect(permission.isEnabled).to.be.false;
            chai_1.expect(permission.isChecked).to.be.false;
            permission.check('a requirement id');
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.false;
        });
        it('ignores ids that are not required or self', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.false;
            permission.uncheck('random');
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.false;
        });
    });
    describe('uncheck', function () {
        var permission;
        beforeEach('setup', function () {
            permission = new Composite_1.Permission('postings.a2', true, true, 'second posting permissions', '', ['postings.a1']);
        });
        it('unchecks when id matches', function () {
            chai_1.expect(permission.isChecked).to.be.true;
            permission.uncheck(permission.id);
            chai_1.expect(permission.isChecked).to.be.false;
        });
        it('unchecks when requiredPermission matches', function () {
            chai_1.expect(permission.isChecked).to.be.true;
            permission.uncheck('postings.a1');
            chai_1.expect(permission.isChecked).to.be.false;
        });
        it('disables when requiredPermission matches', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            permission.uncheck('postings.a1');
            chai_1.expect(permission.isEnabled).to.be.false;
        });
        it('does not disable when requiredPermission does not match', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            permission.uncheck('random');
            chai_1.expect(permission.isEnabled).to.be.true;
            permission.uncheck(permission.id);
            chai_1.expect(permission.isEnabled).to.be.true;
        });
        it('ignores ids that are not required or self', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.true;
            permission.uncheck('random');
            chai_1.expect(permission.isEnabled).to.be.true;
            chai_1.expect(permission.isChecked).to.be.true;
        });
    });
    describe('enable', function () {
        var permission;
        beforeEach('setup', function () {
            permission = new Composite_1.Permission('postings.a2', false, false, 'second posting permissions', '', ['postings.a1']);
        });
        it('ignores ids that are not itself', function () {
            chai_1.expect(permission.isEnabled).to.be.false;
            permission.enable('random');
            chai_1.expect(permission.isEnabled).to.be.false;
        });
        it('enables for an id that is itself', function () {
            chai_1.expect(permission.isEnabled).to.be.false;
            permission.enable(permission.id);
            chai_1.expect(permission.isEnabled).to.be.true;
        });
    });
    describe('disable', function () {
        var permission;
        beforeEach('setup', function () {
            permission = new Composite_1.Permission('postings.a2', true, true, 'second posting permissions', '', ['postings.a1']);
        });
        it('ignores ids that are not itself', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            permission.disable('random');
            chai_1.expect(permission.isEnabled).to.be.true;
        });
        it('disables for an id that is itself', function () {
            chai_1.expect(permission.isEnabled).to.be.true;
            permission.disable(permission.id);
            chai_1.expect(permission.isEnabled).to.be.false;
        });
    });
});
describe('PermissionWithGroup', function () {
    var permissionWGClass = Composite_1.PermissionWithGroup;
    it('imports correctly', function () {
        chai_1.expect(permissionWGClass).to.exist;
    });
    describe('check', function () {
        var permission1;
        var permission2;
        var permissionWG;
        beforeEach('setup', function () {
            permission1 = new Composite_1.Permission('postings.a1', false, false, 'first posting permissions', '', ['a requirement id']);
            permission2 = new Composite_1.Permission('postings.a2', false, false, 'second posting permissions', '', ['a requirement id']);
            permissionWG = new Composite_1.PermissionWithGroup('a requirement id', false, true, 'postings special', '', []);
        });
        describe('when enabled', function () {
            it('updates isChecked when id matches', function () {
                chai_1.expect(permissionWG.isEnabled).to.be.true;
                chai_1.expect(permissionWG.isChecked).to.be.false;
                permissionWG.check(permissionWG.id);
                chai_1.expect(permissionWG.isChecked).to.be.true;
            });
            it('updates isChecked when id matches', function () {
                chai_1.expect(permissionWG.isEnabled).to.be.true;
                chai_1.expect(permissionWG.isChecked).to.be.false;
                permissionWG.check(permissionWG.id);
                chai_1.expect(permissionWG.isChecked).to.be.true;
            });
            it('does not update isChecked when id does not match', function () {
                permissionWG;
                chai_1.expect(permissionWG.isEnabled).to.be.true;
                chai_1.expect(permissionWG.isChecked).to.be.false;
                permissionWG.check(permissionWG.id);
                chai_1.expect(permissionWG.isChecked).to.be.true;
            });
            it('enables children when id matches', function () {
                permissionWG.children.push(permission1);
                permissionWG.children.push(permission2);
                chai_1.expect(permissionWG.isEnabled).to.be.true;
                chai_1.expect(permissionWG.isChecked).to.be.false;
                chai_1.expect(permissionWG.children.every(function (child) { return child.isEnabled; })).to.be.false;
                permissionWG.check(permissionWG.id);
                chai_1.expect(permissionWG.isChecked).to.be.true;
                chai_1.expect(permissionWG.children.every(function (child) { return child.isEnabled; })).to.be.true;
            });
        });
    });
});
