"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.PermissionWithGroup = exports.Permission = void 0;
var Permission = /** @class */ (function () {
    function Permission(id, isChecked, isEnabled, displayText, helperText, requiredPermissionIds) {
        if (requiredPermissionIds === void 0) { requiredPermissionIds = []; }
        this.id = id;
        this.isChecked = isChecked;
        this.isEnabled = isEnabled;
        this.displayText = displayText;
        this.helperText = helperText;
        this.requiredPermissionIds = requiredPermissionIds;
    }
    Permission.prototype.check = function (id) {
        var shouldEnable = this.requiredPermissionIds.includes(id);
        if (shouldEnable) {
            this.enable(this.id);
        }
        else if (this.id === id && this.isEnabled) {
            this.isChecked = true;
        }
    };
    Permission.prototype.uncheck = function (id) {
        var shouldDisable = this.requiredPermissionIds.includes(id);
        if (this.id !== id && !shouldDisable)
            return;
        this.isChecked = false;
        if (shouldDisable) {
            this.disable(this.id);
        }
    };
    Permission.prototype.enable = function (id) {
        if (this.id !== id)
            return;
        this.isEnabled = true;
    };
    Permission.prototype.disable = function (id) {
        if (this.id !== id)
            return;
        this.isEnabled = false;
    };
    return Permission;
}());
exports.Permission = Permission;
var PermissionWithGroup = /** @class */ (function (_super) {
    __extends(PermissionWithGroup, _super);
    function PermissionWithGroup(id, isChecked, isEnabled, displayText, helperText, requiredPerrmissionIds) {
        if (requiredPerrmissionIds === void 0) { requiredPerrmissionIds = []; }
        var _this = _super.call(this, id, isChecked, isEnabled, displayText, helperText, requiredPerrmissionIds) || this;
        _this.id = id;
        _this.isChecked = isChecked;
        _this.isEnabled = isEnabled;
        _this.displayText = displayText;
        _this.helperText = helperText;
        _this.requiredPerrmissionIds = requiredPerrmissionIds;
        _this.children = [];
        return _this;
    }
    PermissionWithGroup.prototype.check = function (id) {
        var shouldEnable = this.requiredPermissionIds.includes(id);
        if (shouldEnable) {
            this.enable(this.id);
        }
        else if (this.id === id && this.isEnabled) {
            this.isChecked = true;
        }
        this.children.forEach(function (child) { return child.check(id); });
    };
    PermissionWithGroup.prototype.uncheck = function (id) {
        var shouldDisable = this.requiredPermissionIds.includes(id);
        if (this.id !== id && !shouldDisable)
            return;
        this.isChecked = false;
        if (shouldDisable) {
            this.disable(this.id);
        }
        this.children.forEach(function (child) { return child.uncheck(id); });
    };
    return PermissionWithGroup;
}(Permission));
exports.PermissionWithGroup = PermissionWithGroup;
var Category = /** @class */ (function () {
    function Category() {
        this.children = [];
    }
    Category.prototype.check = function (id) {
        this.children.forEach(function (child) { return child.check(id); });
    };
    Category.prototype.uncheck = function (id) {
        this.children.forEach(function (child) { return child.uncheck(id); });
    };
    return Category;
}());
exports.Category = Category;
