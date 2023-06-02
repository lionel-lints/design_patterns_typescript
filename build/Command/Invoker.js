"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvocationManager = void 0;
var InvocationManager = /** @class */ (function () {
    function InvocationManager(command) {
        this.command = command;
    }
    InvocationManager.prototype.setCommand = function (command) {
        this.command = command;
    };
    InvocationManager.prototype.runCommand = function () {
        if (this.command === undefined)
            return;
        this.command.execute();
    };
    return InvocationManager;
}());
exports.InvocationManager = InvocationManager;
