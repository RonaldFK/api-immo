"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const token = jsonwebtoken_1.default.sign({
    // à remplacer par un objet
    data: 'userInfo'
}, 'secret', { expiresIn: '1h' });
console.log(token);
// try {
//   const decoded = jwt.verify(token, 'wrong-secret');
// } catch(err) {
//   // err
// }
