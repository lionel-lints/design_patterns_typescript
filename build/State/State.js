"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableEditedDocument = exports.LockedEditedDocument = exports.EditableOriginalDocument = exports.LockedOriginalDocument = void 0;
var LockedOriginalDocument = /** @class */ (function () {
    function LockedOriginalDocument(text, isLocked) {
        this.text = text;
        this.isLocked = isLocked;
    }
    LockedOriginalDocument.prototype.executeQueryPlan = function () {
        console.log('LockedOriginalDocument query plan --> no changes, so no query issued');
    };
    LockedOriginalDocument.prototype.toggleLock = function () {
        return new EditableEditedDocument(this.text, !this.isLocked);
    };
    LockedOriginalDocument.prototype.update = function (newText) {
        console.error("It is not possible to update a LockedOriginalDocument with " + newText + ", UNLOCK it FIRST");
        return new LockedOriginalDocument(this.text, this.isLocked);
    };
    return LockedOriginalDocument;
}());
exports.LockedOriginalDocument = LockedOriginalDocument;
var EditableOriginalDocument = /** @class */ (function () {
    function EditableOriginalDocument(text, isLocked) {
        this.text = text;
        this.isLocked = isLocked;
    }
    EditableOriginalDocument.prototype.executeQueryPlan = function () {
        console.log('EditableOriginalDocument query plan --> no changes, so no query issued');
    };
    EditableOriginalDocument.prototype.toggleLock = function () {
        return new LockedOriginalDocument(this.text, !this.isLocked);
    };
    EditableOriginalDocument.prototype.update = function (newText) {
        return new EditableEditedDocument(newText, this.isLocked);
    };
    return EditableOriginalDocument;
}());
exports.EditableOriginalDocument = EditableOriginalDocument;
var LockedEditedDocument = /** @class */ (function () {
    function LockedEditedDocument(text, isLocked) {
        this.text = text;
        this.isLocked = isLocked;
    }
    LockedEditedDocument.prototype.executeQueryPlan = function () {
        console.log('LockedEditedDocument query plan would be issued!');
    };
    LockedEditedDocument.prototype.toggleLock = function () {
        return new EditableEditedDocument(this.text, !this.isLocked);
    };
    LockedEditedDocument.prototype.update = function (newText) {
        console.error("It is not possible to update a LockedOriginalDocument with " + newText);
        return new LockedEditedDocument(this.text, this.isLocked);
    };
    return LockedEditedDocument;
}());
exports.LockedEditedDocument = LockedEditedDocument;
var EditableEditedDocument = /** @class */ (function () {
    function EditableEditedDocument(text, isLocked) {
        this.text = text;
        this.isLocked = isLocked;
    }
    EditableEditedDocument.prototype.executeQueryPlan = function () {
        console.log('EditableEditedDocument query plan would be issued!');
    };
    EditableEditedDocument.prototype.toggleLock = function () {
        return new LockedEditedDocument(this.text, !this.isLocked);
    };
    EditableEditedDocument.prototype.update = function (newText) {
        return new EditableEditedDocument(newText, this.isLocked);
    };
    return EditableEditedDocument;
}());
exports.EditableEditedDocument = EditableEditedDocument;
