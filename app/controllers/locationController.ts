import { Request,Response } from "express";
import { Location } from "../models/Location";
import { dataSource } from "../data/dataSource";


export const locationController = {
  /**
   * Récupère la liste des localisations
   * @param req
   * @param res
   */
  async getAllLocation (req:Request,res:Response) {
    console.log('location');

    try{
      const locationList = await dataSource.manager.find(Location);
      locationList.length > 0 ? res.status(200).json(locationList) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Récupère une localisation depuis l'ID
   * @param req
   * @param res
   */
  async getOneLocationById (req:Request,res:Response){
    const id = req.params.id;

    const location = await dataSource.getRepository(Location).find({where:{id:Number(id)}});

    try{
      location.length>0 ? res.status(200).json(location) : res.status(204).send();
    } catch(err){res.status(500).json(err);}
  },
  /**
   * Création d'une nouvelle localisation
   * @param req
   * @param res
   */
  async createLocation (req:Request,res:Response){
    const dataRequest = <typeLocation>req.body;

    const dataToInsert = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values(
        dataRequest
      )
      .execute();

    const returnResult = await dataSource.getRepository(Location).find({where:{id:dataToInsert.raw[0].id}});
    res.status(200).json(returnResult);
  },
  /**
   * Met à jour une localisation
   * @param {} req Id de la localisation
   * @param {*} res
   * @returns {}  Statut 200 avec nouvelles informations
   * @throws Statut 500
   */
  async updateOneLocation (req:Request,res:Response) {
    const id = req.params.id;
    const dataRequest = <typeLocation>req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Location)
        .set(dataRequest)
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Location).find({where:{id:Number(id)}});
      console.table(returnResult);

      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Supression d'une localisation
   * @param {} req Id de la localisation
   * @param {*} res
   * @returns {}  Statut 200
   * @throws Statut 500
   */
  async deleteOneLocation(req:Request,res:Response){
    const id = req.params.id;

    try{
      const dataToDelete = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Location)
        .where({ id: Number(id) })
        .execute();

      dataToDelete.affected === 1 ? res.status(200).json({Information: 'Supprimé avec succès'}) : res.json({Information: 'Aucun bien de correspond'});


    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  }
};
