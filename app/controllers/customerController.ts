import {Request,Response}from 'express';
import { dataSource } from '../data/dataSource';
import { Customer } from '../models/Customer';

export const customerController = {
  async getAllCustomer (req:Request,res:Response){
    try{


      const customerList = await dataSource.manager.find(Customer);
      console.table(customerList);
      customerList.length >0 ? res.status(200).json(customerList) : res.status(204).send();
    }catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  async getOneCustomerById (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});

      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  async getOneCustomerByType (req:Request,res:Response) {
    const {type} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{type_of_customer:type}});
      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  async createCustomer (req:Request,res:Response) {
    const dataRequest = <typeCustomer>req.body;

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values(
          dataRequest
        )
        .execute();

      const returnResult = await dataSource.getRepository(Customer).find({where:{id:dataToInsert.raw[0].id}});
      console.table(returnResult);
      res.status(200).json(returnResult);
    } catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  async updateOneCustomer (req:Request,res:Response) {
    const {id} = req.params;
    const dataRequest:typeCustomer = req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Customer)
        .set({ firstname: dataRequest.firstname,
          lastname: dataRequest.lastname ,
          tel:dataRequest.tel,
          type_of_customer:dataRequest.type_of_customer,
          cash_or_credit:dataRequest.cash_or_credit,
          date_of_selling:dataRequest.date_of_selling
        })
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});
      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      console.log(err);

      res.status(500).json(err);
    }
  },
  async deleteOneCustomer (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const dataToDelete = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Customer)
        .where({ id: Number(id) })
        .execute();

      dataToDelete.affected === 1 ? res.status(200).json({Information: 'Supprimé avec succès'}) : res.json({Information: 'Aucun bien de correspond'});


    } catch(err){console.log(err);
      console.log(err);

      res.status(500).json(err);
    }
  }
};
