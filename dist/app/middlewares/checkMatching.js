"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMatching = void 0;
exports.checkMatching = {
    MatchingPass(req, res, next) {
        const dataRequest = req.body;
        console.log(dataRequest);
        if (dataRequest.password !== dataRequest.checkPassword) {
            res.status(400).json({ Information: 'Vérification du mot de passe non valide' });
        }
        next();
    }
};
