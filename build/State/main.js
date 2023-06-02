"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// main
var State_1 = require("./State");
var sleep = function (m) { return new Promise(function (r) { return setTimeout(r, m); }); };
var SLEEPTIME = 1500;
// the client runtime
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var a, b, draftManager;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('');
                console.log('First we create an array of Objects with Original State');
                a = new State_1.LockedOriginalDocument('locked text for a', true);
                b = new State_1.EditableOriginalDocument('unlocked text for b', false);
                draftManager = [a, b];
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 1:
                _a.sent();
                console.log(draftManager);
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 2:
                _a.sent();
                console.log('');
                console.log('then we try to edit the locked document');
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 3:
                _a.sent();
                draftManager[0] = draftManager[0].update('new text for A');
                console.log('');
                console.log("after the update:", draftManager[0]);
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 4:
                _a.sent();
                console.log('');
                console.log('then we try to edit the editable document');
                draftManager[1] = draftManager[1].update('new text for B');
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 5:
                _a.sent();
                console.log('');
                console.log(draftManager);
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 6:
                _a.sent();
                console.log('');
                console.log("as you can see, ^up there^, the editable document transitioned while the locked one did not");
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 7:
                _a.sent();
                console.log('');
                console.log("finally we try out the query plan for each document given thier current state");
                return [4 /*yield*/, sleep(SLEEPTIME)];
            case 8:
                _a.sent();
                console.log('');
                draftManager.forEach(function (draft) { return draft.executeQueryPlan(); });
                return [2 /*return*/];
        }
    });
}); };
exports.default = main;
