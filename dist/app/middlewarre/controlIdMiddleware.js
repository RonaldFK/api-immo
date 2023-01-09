"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlIdMiddleware = void 0;
exports.controlIdMiddleware = {
    /**
       *
       * @param req // Controle de la syntax de l'ID avant traitement de la demande
       * @param res
       * @returns
       */
    syntaxControl(req, res, next) {
        const id = req.params.id;
        const regexNumber = /^[0-9]*$/g;
        const testRegexNumber = regexNumber.test(id);
        console.log(testRegexNumber);
        if (testRegexNumber === false) {
            return res.status(400).json({ Error: 'Id incorrect, merci de vérifier celui-ci' });
        }
        next();
    }
};
