import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';




export const tokenController = {
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
  async genToken(obj:{login:string}){
    // const dataRequest = req.body;

    const token = await jwt.sign({

      data: {obj}
    }, process.env.JWT_KEY || 'secret', { expiresIn: 120 });
    try {
      return {token:token};

    }catch(err){ return err;
    }
  },
  /**
   * Permet de vérifier si le user possède un token valide
   * @param req Token à vérifier
   * @param res communication du statut de la demande
   */
  async validateToken(req:Request,res:Response){

    let tokenToCheck = req.headers.authorization;

    // uniquement nécessaire pour les tests avec postman
    tokenToCheck = tokenToCheck?.replace('Bearer ','');
    console.log(tokenToCheck);

    try {
      const decoded = await jwt.verify(`${tokenToCheck}`, 'secret');

      if (decoded) {

        res.status(200).json({Information : 'token valide'});
      }
    } catch(err) {
      console.log(err);

      res.status(401).json({Error: 'acces denied'});

    }
  }
};
