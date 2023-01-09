import { Request,Response,NextFunction } from "express";


export const controlSyntaxMiddleware = {
  /**
     *
     * @param req // Controle de la syntax de l'ID avant traitement de la demande
     * @param res
     * @returns
     */
  syntaxIdControl (req:Request, res:Response, next:NextFunction){
    const id = req.params.id;

    const regexNumber = /^[0-9]*$/g;
    const testRegexNumber = regexNumber.test(id);
    console.log(testRegexNumber);

    if(testRegexNumber === false){return res.status(400).json({Error: 'Id incorrect, merci de vérifier celui-ci'});}
    next();
  },
  syntaxTypeControl(req:Request, res:Response, next:NextFunction){
    const type = req.params.type;

    const regexString = /^([a-zA-Z]{3,})$/g;
    const testRegex = regexString.test(type);

    // Vérification syntaxique du type demandé
    if (testRegex === false) {return res.status(400).json({Error: 'Recherche erronée, vérifier le type demandé'});}
    next();
  }

};
