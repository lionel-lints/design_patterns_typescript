"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("./Context");
var Strategy_1 = require("./Strategy");
var main = function () {
    var eAnon = new Strategy_1.EmailAnonymizer();
    var cont = new Context_1.anonymizationContext(eAnon);
    console.log(cont.anonymize('2'));
};
exports.default = main;
