"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mainObserver from './Observer/main'
var main_1 = __importDefault(require("./Strategy/main"));
// import mainCommand from './Command/main'
// import mainState from './State/main'
var main = function () {
    console.log("");
    console.log("''''''''''''''''''''''''''''''''''''''''''''''''''");
    console.log("'''''''''''''''''''''STRATEGY'''''''''''''''''''''");
    console.log("''''''''''''''''''''''''''''''''''''''''''''''''''");
    console.log("");
    (0, main_1.default)();
    // console.log("")
    // console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
    // console.log("'''''''''''''''''''''OBSERVER'''''''''''''''''''''")
    // console.log("''''''''''''''''''''''''''''''''''''''''''''''''''")
    // console.log("")
    // mainObserver()
    // mainState()
};
main();
