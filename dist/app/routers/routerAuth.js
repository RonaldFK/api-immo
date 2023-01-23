"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const index_1 = require("../middlewares/index");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/signup', index_1.controlUniqData.uniqueDataControlManager, index_1.checkMatching.MatchingPass, authController_1.authController.signupAccount);
exports.authRouter.post('/signin', authController_1.authController.signinAccess);
