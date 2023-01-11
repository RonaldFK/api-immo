import { Request,Response,NextFunction } from "express";
import { dataSource } from "../data/dataSource";
import { Location } from "../models/Location";


export const controlUniqData = {
  /**
   * Controle de l'unicité de la demande de création.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControl (req:Request,res:Response,next:NextFunction){
    const {num,street,city,country,code} = req.body;
    if (num === undefined || street === undefined || city === undefined || country === undefined || code === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Location).find({where:{num:num,street:street,city:city,country:country,code:code}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Cette localisation existe déjà'});
    }
    next();
  }
};
