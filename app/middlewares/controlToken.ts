import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export const controlToken = {
  /**
   * Permet de vérifier si le user possède un token valide
   * @param req Token à vérifier
   * @param res communication du statut de la demande
   */
  async validateToken(req:Request,res:Response,next:NextFunction){

    let tokenToCheck = req.headers.authorization;

    // uniquement nécessaire pour les tests avec postman
    tokenToCheck = tokenToCheck?.replace('Bearer ','');

    try {
      const decoded = await jwt.verify(`${tokenToCheck}`, process.env.JWT_KEY || 'secret');
      console.log(decoded?.data);

      if (decoded?.data) {

        res.status(200);
        next();
      }
    } catch(err) {
      console.log(err);
      // si token présent dans le header mais expiré, je renvoie la date d'expiration, sinon j'indique simplement que l'accès est vérouillé.
      err?.expiredAt ? res.status(401).json({Error: 'acces denied',expiredAt:err?.expiredAt}) :res.status(401).json({Error: 'acces denied'});

    }
  }
};
