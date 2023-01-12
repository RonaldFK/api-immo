import {Request,Response}from 'express';
import { dataSource } from '../data/dataSource';
import { Seller } from '../models/Seller';

export const sellerController = {
  async getAllSeller (req:Request,res:Response){
    try{
      const sellerList = await dataSource.getRepository(Seller).find({relations:{customer:true}});

      console.table(sellerList);

      sellerList.length >0 ? res.status(200).json(sellerList) : res.status(204).send();
    }catch(err){
      res.status(500).json(err);
      console.log(err);

    }
  }
};
