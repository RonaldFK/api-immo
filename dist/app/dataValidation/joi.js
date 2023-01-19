"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object().keys({
    firstname: joi_1.default.string()
        .min(3)
        .max(40)
        .required(),
    lastname: joi_1.default.string()
        .min(3)
        .max(40)
        .required(),
    email: joi_1.default.string()
        .required()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'email'] },
    }),
    password: joi_1.default.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // suppression contrôle validation du mot de passe, géré en code maison
});
