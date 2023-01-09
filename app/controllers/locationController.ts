import { Request,Response } from "express";
import { Location } from "../models/Location";
import { dataSource } from "../data/dataSource";


export const locationController = {
  async getAllLocation (req:Request,res:Response) {
    try{
      const locationList = await dataSource.manager.find(Location);
      locationList.length > 0 ? res.status(200).json(locationList) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
  async getOneLocationById(req:Request,res:Response){
    const id = req.params.id;

    const location = await dataSource.getRepository(Location).find({where:{id:Number(id)}});

    try{
      res.status(200).json(location);
    } catch(err){res.status(500).json(err);}
  }
};
