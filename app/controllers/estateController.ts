import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { Request,Response } from 'express';

export const estateController = {
  async getAllEstate (req:Request,res:Response) {
    try{
      const estateList = await dataSource.manager.find(Estate);
      res.status(200).json(estateList);

    } catch(err){
      console.log(err);

    }

  }
};

