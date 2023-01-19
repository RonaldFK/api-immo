import { Request,Response,NextFunction } from "express";
import { dataSource } from "../data/dataSource";
import { Customer } from "../models/Customer";
import { Estate } from "../models/Estate";
import { Location } from "../models/Location";
import { Manager } from "../models/Manager";


export const controlUniqData = {
  /**
   * Controle de l'unicité d'un bien.
   * @param req
   * @param res
   * @param next
   * @returns
   */
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
   * Controle de l'unicité d'une localisation.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControlLocation (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeLocation = req.body;

    if (dataRequest.num === undefined
      || dataRequest.street === undefined
      || dataRequest.city === undefined
      || dataRequest.country === undefined
      || dataRequest.code === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Location).find({where:{num:dataRequest.num,street:dataRequest.street,city:dataRequest.city,country:dataRequest.country,code:dataRequest.code}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Cette localisation existe déjà'});
    }
    next();
  },
  /**
   * Controle de l'unicité d'un client.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControlCustomer (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeCustomer = req.body;
    if (dataRequest.firstname === undefined
      || dataRequest.lastname === undefined
      || dataRequest.tel === undefined
      || dataRequest.cash_or_credit === undefined
      || dataRequest.date_of_selling === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Customer).find({where:{firstname:dataRequest.firstname,lastname:dataRequest.lastname,tel:Number(dataRequest.tel)}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Ce client existe déjà'});
    }
    next();
  },
  /**
   * Controle de l'unicité d'un collaborateur.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControlManager (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeManager = req.body;
    if (dataRequest.firstname === undefined
      || dataRequest.lastname === undefined
      || dataRequest.password === undefined
      || dataRequest.email === undefined
      || dataRequest.login === undefined){ return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Manager).find({where:{email:dataRequest.email,login:dataRequest.login}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Ce manager à déjà été créé'});
    }
    next();
  },
  /**
   * Controle de l'unicité d'un bien.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uniqueDataControlParking (req:Request,res:Response,next:NextFunction){
    const dataRequest:typeParking = req.body;

    if (dataRequest.name === undefined
        || dataRequest.price === undefined){return res.status(400).json({Error:'Formulaire non complet'});}

    const dataToControl = await dataSource.getRepository(Estate).find({where:{name:dataRequest.name}});

    if(dataToControl.length>0){
      return res.status(400).json({Error:'Ce bien a déjà été créé'});
    }
    next();
  },

};
