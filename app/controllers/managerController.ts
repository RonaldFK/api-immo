import {Request,Response}from 'express';
import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { Manager } from '../models/Manager';

export const managerController = {
  async getAllManager (req:Request,res:Response){
    try{

      const managerList = await dataSource.manager.find(Manager);

      managerList.length >0 ? res.status(200).json(managerList) : res.status(204).send();
    }catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  async getOneManagerById (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const manager = await dataSource.getRepository(Manager).find({where:{id:Number(id)}});


      // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const, prefer-const, prefer-const
      // let formatManagerDataToSend = [];
      // // eslint-disable-next-line prefer-const
      // let format: {[key: number]: string} ={};

      // for (let i = 0; i < manager.length; i++) {
      //   format = manager[i].bien;
      // }
      // formatManagerDataToSend.push(format);
      // manager.push(formatManagerDataToSend);
      // // console.log(newo);


      manager.length > 0 ? res.status(200).json(manager) : res.status(204).send();

    } catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  async getEstateByManager (req:Request,res:Response) {
    const {id} = req.params;

    try{

      const estateOfCurrentManager = await dataSource.getRepository(Estate).find({where:{manager_id:Number(id)}});

      estateOfCurrentManager.length > 0 ? res.status(200).json(estateOfCurrentManager) : res.status(204).send();

    } catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  // async createManager (req:Request,res:Response) {
  //   const dataRequest:typeManager = req.body;

  //   try{
  //     const dataToInsert = await dataSource
  //       .createQueryBuilder()
  //       .insert()
  //       .into(Manager)
  //       .values(
  //         {
  //           firstname: dataRequest.firstname ,
  //           lastname:dataRequest.lastname,
  //           password:dataRequest.password,
  //           login:dataRequest.login,
  //           email:dataRequest.email
  //         }
  //       )
  //       .execute();

  //     const returnResult = await dataSource.getRepository(Manager).find({where:{id:dataToInsert.raw[0].id}});
  //     console.table(returnResult);
  //     res.status(200).json(returnResult);
  //   } catch(err){
  //     console.log(err);

  //     res.status(500).json(err);
  //   }
  // },
  async updateOneManager (req:Request,res:Response) {
    const {id} = req.params;
    const dataRequest = <typeManager>req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Manager)
        .set(dataRequest)
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Manager).find({where:{id:Number(id)}});
      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      console.log(err);

      res.status(500).json(err);
    }
  },
  async deleteOneManager (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const dataToDelete = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Manager)
        .where({ id: Number(id) })
        .execute();

      dataToDelete.affected === 1 ? res.status(200).json({Information: 'Supprimé avec succès'}) : res.json({Information: 'Aucun bien de correspond'});


    } catch(err){console.log(err);
      console.log(err);

      res.status(500).json(err);
    }
  }
};
