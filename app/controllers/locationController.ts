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
    const dataRequest:typeLocation = req.body;

    const dataToInsert = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values(
        { num:dataRequest.num,
          street: dataRequest.street,
          city: dataRequest.city ,
          country:dataRequest.country,
          code:dataRequest.code
        }
      )
      .execute();

    const returnResult = await dataSource.getRepository(Location).find({where:{id:dataToInsert.raw[0].id}});
    res.status(200).json(returnResult);
  },
  async updateOneLocation (req:Request,res:Response) {
    const id = req.params.id;
    const dataRequest:typeLocation = req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Location)
        .set({ num: dataRequest.num,
          street: dataRequest.street ,
          city:dataRequest.city,
          country:dataRequest.country,
          code:dataRequest.code
        })
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Location).find({where:{id:Number(id)}});
      console.table(returnResult);

      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
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
