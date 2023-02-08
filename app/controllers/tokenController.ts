import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';




export const tokenController = {
  /**
   * Permet de renvoyer un token suite à la demande client
   * @param req
   * @param res communication du token
   */

  async genToken(obj:{login:string}){

    const token = await jwt.sign({

      data: {obj}
    }, process.env.JWT_KEY || 'secret', { expiresIn: 240 });
    try {
      return {token:token};

    }catch(err){ return err;}
  }
};
