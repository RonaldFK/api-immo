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
  /**
   *
   * @param req // Récupère l'id du biens recherché
   * @param res
   */
  async getOneEstateById (req:Request,res:Response){

    const id = req.params.id;
    try{
      const estate = await dataSource.getRepository(Estate).find({where:{id:Number(id)},relations:{location:true,parking:true}});
      console.log(estate);

      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  /**
   *
   * @param req // Récupère le type de biens recherché
   * @param res
   */
  async getEstateByType (req:Request,res:Response){
    const type = req.params.type;

    const regex = /^([a-zA-Z]{2,})$/g;
    const testRegex = regex.test(type);

    // Vérification syntaxique du type demandé
    if (testRegex === false) {return res.status(400).json({Error: 'Recherche erronée, vérifier le type demandé'});}
    try{
      const estate = await dataSource.getRepository(Estate).find({where:{type:`${type}`}});
      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      console.log('ici');

      res.status(500).json(err);
    }
  },
  /**
   *
   * @param req // Récupère les infos du formulaire pour la création d'un bien
   * @param res
   */
  async createEstate(req:Request,res:Response){
    const {name,price,type} = req.body;
    if (name === undefined || price === undefined || type === undefined){res.status(400).json({Error:'Formulaire non complet'});}

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Estate)
        .values(
          { name: name,
            price: price ,
            type:type}
        )
        .execute();

      const returnResult = await dataSource.getRepository(Estate).find({where:{id:dataToInsert.raw[0].id}});
      res.status(200).json(returnResult);

    } catch(err: any){
      // Controle du code d'erreur, puis renvoie d'un message clair à l'utilisateur et detail erreur
      err.driverError.code === '23505' && res.status(500).json({DétailError :err.driverError.detail,Message:'Violation de contrainte, donnée existante'});

    }
  }
};

