"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
exports.tokenController = {
    genToken(req, res) {
        const dataRequest = req.body;
        const token = jsonwebtoken_1.default.sign({
            // à remplacer par un objet
            data: { dataRequest }
        }, 'secret', { expiresIn: 60 });
        res.json(token);
    },
    validateToken(req, res) {
        let tokenToCheck = req.headers.authorization;
        tokenToCheck = tokenToCheck === null || tokenToCheck === void 0 ? void 0 : tokenToCheck.replace('Bearer ', '');
        console.log(tokenToCheck);
        try {
            const decoded = jsonwebtoken_1.default.verify(`${tokenToCheck}`, 'secret');
            console.log(decoded, 'VERIF');
            if (decoded) {
                res.json('tout est ok');
            }
        }
        catch (err) {
            // err
            console.log(err);
        }
        // const token = jwt.sign(data, jwtSecretKey);
        // res.json(token);
    }
};
