import { Request,Response,NextFunction } from "express";

/**
   * Middleware validation correspondance du mot de passe avec la vérification de mot de passe
   * @param _req mot de passe et vérification mot de passe
   *
   */
export const checkMatching = {
  MatchingPass (req:Request,res:Response,next:NextFunction){

    const dataRequest = <typeManager>req.body;

    if (dataRequest?.password !== dataRequest?.checkPassword) {
      return res.status(400).json({Information:'Vérification du mot de passe non valide'});
    }
    next();
  }
};
