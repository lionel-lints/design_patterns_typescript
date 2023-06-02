"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymizationContext = void 0;
var anonymizationContext = /** @class */ (function () {
    function anonymizationContext(strategy) {
        this.strategy = strategy;
    }
    anonymizationContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    anonymizationContext.prototype.anonymize = function (profileId) {
        return this.strategy.anonymize(profileId);
    };
    return anonymizationContext;
}());
exports.anonymizationContext = anonymizationContext;
