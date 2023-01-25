import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');



export const tokenController = {
  genToken(req:Request,res:Response){
    const dataRequest = req.body;

    const token = jwt.sign({
      // à remplacer par un objet
      data: {dataRequest}
    }, 'secret', { expiresIn: 60 });

    res.json(token);
  },
  validateToken(req:Request,res:Response){

    let tokenToCheck = req.headers.authorization;
    tokenToCheck = tokenToCheck?.replace('Bearer ','');
    console.log(tokenToCheck);



    try {
      const decoded = jwt.verify(`${tokenToCheck}`, 'secret');
      console.log(decoded, 'VERIF');

      if (decoded) {

        res.json('tout est ok');
      }
    } catch(err) {
      // err
      console.log(err);

    }

    // const token = jwt.sign(data, jwtSecretKey);

    // res.json(token);
  }
};
