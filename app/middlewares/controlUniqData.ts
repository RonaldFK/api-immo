import { Request,Response,NextFunction } from "express";
import { dataSource } from "../data/dataSource";
import { Location } from "../models/Location";


export const controlUniqData = {
  async uniqueDataControl (req:Request,res:Response,next:NextFunction){
    const {num,street,city,country,code} = req.body;

    const dataToControl = await dataSource.getRepository(Location).find({where:{num:num,street:street,city:city,country:country,code:code}});
    console.log(dataToControl);
    if(dataToControl.length>0){
      return res.status(400).json({Error:'Cette localisation existe déjà'});
    }
    next();
  }
};
