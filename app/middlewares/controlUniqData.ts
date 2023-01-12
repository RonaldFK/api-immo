import { Request,Response,NextFunction } from "express";
import { dataSource } from "../data/dataSource";
import { Customer } from "../models/Customer";
import { Estate } from "../models/Estate";
import { Location } from "../models/Location";


export const controlUniqData = {
  async uniqueDataControlEstate (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeEstate = req.body;

    if (dataRequest.name === undefined
      || dataRequest.price === undefined
      || dataRequest.type === undefined ){
      return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Estate).find({where:{name:dataRequest.name}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Ce bien a déjà été créé'});
    }
    next();
  },
  /**
   * Controle de l'unicité de la demande de création.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControlLocation (req:Request,res:Response,next:NextFunction){
    const {num,street,city,country,code} = req.body;
    if (num === undefined || street === undefined || city === undefined || country === undefined || code === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Location).find({where:{num:num,street:street,city:city,country:country,code:code}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Cette localisation existe déjà'});
    }
    next();
  },
  async uniqueDataControlCustomer (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeCustomer = req.body;
    if (dataRequest.firstname === undefined
      || dataRequest.lastname === undefined
      || dataRequest.tel === undefined
      || dataRequest.cash_or_credit === undefined
      || dataRequest.date_of_selling === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Customer).find({where:{firstname:dataRequest.firstname,lastname:dataRequest.lastname,tel:Number(dataRequest.tel),cash_or_credit:dataRequest.cash_or_credit,date_of_selling:new Date(dataRequest.date_of_selling)}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Ce client existe déjà'});
    }
    next();
  },

};
