"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandQuery = void 0;
var CommandQuery = /** @class */ (function () {
    function CommandQuery(query, params) {
        this.query = query;
        this.params = params;
    }
    CommandQuery.prototype.execute = function () {
        this.query(this.params);
    };
    return CommandQuery;
}());
exports.CommandQuery = CommandQuery;
