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

    try{
      const estate = await dataSource.getRepository(Estate).find({where:{type:`${type}`}});
      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  /**
   *
   * @param req // Récupère les infos du formulaire pour la création d'un bien
   * @param res
   */
  async createEstate(req:Request,res:Response){
    const {name,price,type,location_id,parking_id} = req.body;
    if (name === undefined || price === undefined || type === undefined){res.status(400).json({Error:'Formulaire non complet'});}

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Estate)
        .values(
          { name: name,
            price: price ,
            type:type,
            location_id:location_id,
            parking_id:parking_id
          }
        )
        .execute();

      const returnResult = await dataSource.getRepository(Estate).find({where:{id:dataToInsert.raw[0].id}});
      res.status(200).json(returnResult);

    } catch(err: any){
      // Si la donnée existe déjà, puis renvoie d'un message clair à l'utilisateur et detail erreur
      // le code 23505 est celui renvoyer si violation de contrainte
      err.driverError.code === '23505' && res.status(500).json({DétailError :err.driverError.detail,Message:'Violation de contrainte, donnée existante'});

    }
  },
  /**
   *
   * @param req // Récupération de l'id du bien à mettre à jour plus info à insérer
   * @param res
   */
  async updateOneEstate(req:Request,res:Response){
    const id = req.params.id;
    const {name,price,type,location_id,parking_id} = req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Estate)
        .set({ name: name,
          price: price ,
          type:type,
          location_id:location_id,
          parking_id:parking_id
        })
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Estate).find({where:{id:Number(id)}});
      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      res.status(500).json(err);
    }
  },
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

