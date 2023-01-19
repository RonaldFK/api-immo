import { Request,Response,NextFunction } from "express";


export const checkMatching = {
  MatchingPass (req:Request,res:Response,next:NextFunction){

    const dataRequest:typeManager = req.body;
    console.log(dataRequest);

    if (dataRequest.password !== dataRequest.checkPassword) {
      return res.status(400).json({Information:'Vérification du mot de passe non valide'});
    }
    next();
  }
};
