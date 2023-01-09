"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlSyntaxMiddleware = void 0;
exports.controlSyntaxMiddleware = {
    /**
       *
       * @param req // Controle de la syntax de l'ID avant traitement de la demande
       * @param res
       * @returns
       */
    syntaxIdControl(req, res, next) {
        const id = req.params.id;
        const regexNumber = /^[0-9]*$/g;
        const testRegexNumber = regexNumber.test(id);
        console.log(testRegexNumber);
        if (testRegexNumber === false) {
            return res.status(400).json({ Error: 'Id incorrect, merci de vérifier celui-ci' });
        }
        next();
    },
    /**
     *
     * @param req // Controle de la syntaxe du type avant traitement de la demande
     * @param res
     * @param next
     * @returns
     */
    syntaxTypeControl(req, res, next) {
        const type = req.params.type;
        const regexString = /^([a-zA-Z]{3,})$/g;
        const testRegex = regexString.test(type);
        // Vérification syntaxique du type demandé
        if (testRegex === false) {
            return res.status(400).json({ Error: 'Recherche erronée, vérifier le type demandé' });
        }
        next();
    }
};