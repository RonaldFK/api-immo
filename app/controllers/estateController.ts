import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { Request,Response } from 'express';

export const estateController = {
  /**
   * Récupère la liste complète des Biens
   * @param _req
   * @param res
   */
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
   * Récupère les informations d'un bien en particulier selon l'ID founie.
   * @param req
   * @param res
   */
  async getOneEstateById (req:Request,res:Response){

    const id = req.params.id;

    try{
      const estate = await dataSource.getRepository(Estate).find({where:{id:Number(id)},relations:{location:true,parking:true,customer:true,manager:true}});
      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Récupère la liste des biens qui corresponde à un type donné.
   * @param req
   * @param res
   */
  async getEstateByType (req:Request,res:Response){
    const type = req.params.type;

    try{
      const estate = await dataSource.getRepository(Estate).find({where:{type:`${type}`}});
      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  /**
   * Création d'un nouveau bien
   * @param req
   * @param res
   */
  async createEstate(req:Request,res:Response){
    const dataRequest:typeEstate = req.body;
    if (dataRequest.name === undefined
      || dataRequest.price === undefined
      || dataRequest.type === undefined){res.status(400).json({Error:'Formulaire non complet'});}

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Estate)
        .values(
          { name: dataRequest.name,
            price: dataRequest.price ,
            type:dataRequest.type,
            location_id:dataRequest.location_id,
            parking_id:dataRequest.parking_id
          }
        )
        .execute();

      const returnResult = await dataSource.getRepository(Estate).find({where:{id:dataToInsert.raw[0].id}});
      res.status(200).json(returnResult);


    } catch(err){
      console.log(err);

    }
  },
  /**
   * Mettre à jour les informations d'un bien
   * @param req
   * @param res
   */
  async updateOneEstate(req:Request,res:Response){
    const id = req.params.id;
    const dataRequest:typeEstate = req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Estate)
        .set({ name: dataRequest.name,
          price: dataRequest.price ,
          type:dataRequest.type,
          location_id:dataRequest.location_id,
          parking_id:dataRequest.parking_id,
          manager_id:dataRequest.manager_id,
          customer_id:dataRequest.customer_id
        })
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Estate).find({where:{id:Number(id)}});
      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Suppression d'un bien
   * @param req
   * @param res
   */
  async deleteOneEstate(req:Request,res:Response){
    const id = req.params.id;

    try{
      const dataToDelete = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Estate)
        .where({ id: Number(id) })
        .execute();

      dataToDelete.affected === 1 ? res.status(200).json({Information: 'Supprimé avec succès'}) : res.json({Information: 'Aucun bien de correspond'});


    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  }
};

