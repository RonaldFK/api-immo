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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.tokenController = {
    /**
     * Permet de renvoyer un token suite à la demande client
     * @param req
     * @param res communication du token
     */
    // async genToken(req:Request,res:Response){
    //   const dataRequest = req.body;
    //   const token = await jwt.sign({
    //     data: {dataRequest}
    //   }, process.env.JWT_KEY || 'secret', { expiresIn: 120 });
    //   try {
    //     res.json(token);
    //   }catch(err){ console.log(err);
    //   }
    // },
    genToken(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            // const dataRequest = req.body;
            const token = yield jsonwebtoken_1.default.sign({
                data: { obj }
            }, process.env.JWT_KEY || 'secret', { expiresIn: 120 });
            try {
                return { token: token };
            }
            catch (err) {
                return err;
            }
        });
    },
    /**
     * Permet de vérifier si le user possède un token valide
     * @param req Token à vérifier
     * @param res communication du statut de la demande
     */
    validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenToCheck = req.headers.authorization;
            // uniquement nécessaire pour les tests avec postman
            tokenToCheck = tokenToCheck === null || tokenToCheck === void 0 ? void 0 : tokenToCheck.replace('Bearer ', '');
            console.log(tokenToCheck);
            try {
                const decoded = yield jsonwebtoken_1.default.verify(`${tokenToCheck}`, 'secret');
                if (decoded) {
                    res.status(200).json({ Information: 'token valide' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(401).json({ Error: 'acces denied' });
            }
        });
    }
};
