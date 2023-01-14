import {Request,Response}from 'express';
import { dataSource } from '../data/dataSource';
import { Customer } from '../models/Customer';

export const customerController = {
  async getAllCustomer (req:Request,res:Response){
    try{
      console.log('test');

      const customerList = await dataSource.manager.find(Customer);

      customerList.length >0 ? res.status(200).json(customerList) : res.status(204).send();
    }catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  async getOneCustomer (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});
      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  async createCustomer (req:Request,res:Response) {
    const dataRequest:typeCustomer = req.body;

    try{
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values(
          { id: dataRequest.id,
            firstname: dataRequest.firstname ,
            lastname:dataRequest.lastname,
            tel:dataRequest.tel,
            type_of_customer:dataRequest.type_of_customer,
            cash_or_credit:dataRequest.cash_or_credit,
            date_of_selling:dataRequest.date_of_selling
          }
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
  }
};
