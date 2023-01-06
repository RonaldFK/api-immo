import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { Request,Response } from 'express';

export const estateController = {
  async getAllEstate (_req:Request,res:Response) {
    try{
      const estateList = await dataSource.manager.find(Estate);
      estateList.length >0 ? res.status(200).json(estateList) : res.status(204).send();

    } catch(err){
      console.log(err);
      res.status(500).json(err);
    }

  },
  async getOneEstate (req:Request,res:Response){
    const id = req.params.id;
    try{
      const estate = await dataSource.getRepository(Estate).findBy({id:Number(id)});
      console.log(estate);

      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  }
};

