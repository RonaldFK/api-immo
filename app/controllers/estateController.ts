import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { uploadFile } from '../middlewares/uploadFile';
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
      const estate = await dataSource.getRepository(Estate).find({where:{id:Number(id)},relations:{location:true,customer:true,manager:true}});
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
      const estate = await dataSource.getRepository(Estate).find({where:{type:`${type}`},relations:{manager:true,customer:true}});
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
    const dataRequest = <typeEstate>req.body;
    if (dataRequest.name === undefined
      || dataRequest.price === undefined
      || dataRequest.type === undefined){res.status(400).json({Error:'Formulaire non complet'});}

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Estate)
        .values(
          dataRequest
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
    const dataRequest = <typeEstate>req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Estate)
        .set(dataRequest)
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
  },
  // async addPhoto(req:Request,res:Response){
  // try{
  //   console.log(req.file);

  //   if (req.file == undefined) {
  //     return res.status(400).send({ message: "Please upload a file!" });
  //   }

  //   res.status(200).send({
  //     message: "Uploaded the file successfully: " + req.file.originalname,
  //   });
  // }catch (err) {
  //   res.status(500).send({
  //     message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
  //   });
  // }
  // },
  getPhoto(req:Request, res:Response){
    const fileName = req.params.name;
    const directoryPath = "app/assets/";

    res.download(directoryPath + fileName, fileName, (err) => {
      console.log('DOWNLOAD');

      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  },
};

