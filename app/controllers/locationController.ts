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
  async getOneLocationById (req:Request,res:Response){
    const id = req.params.id;

    const location = await dataSource.getRepository(Location).find({where:{id:Number(id)}});

    try{
      location.length>0 ? res.status(200).json(location) : res.status(204).send();
    } catch(err){res.status(500).json(err);}
  },
  async createLocation (req:Request,res:Response){
    const {num,street,city,country,code} = req.body;

    const dataToInsert = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values(
        { num:num,
          street: street,
          city: city ,
          country:country,
          code:code
        }
      )
      .execute();

    const returnResult = await dataSource.getRepository(Location).find({where:{id:dataToInsert.raw[0].id}});
    res.status(200).json(returnResult);
  }
};
