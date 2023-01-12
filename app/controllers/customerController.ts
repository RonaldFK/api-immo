import {Request,Response}from 'express';
import { dataSource } from '../data/dataSource';
import { Customer } from '../models/Customer';

export const customerController = {
  async getAllCustomer (req:Request,res:Response){
    try{
      const customerList = await dataSource.manager.find(Customer);
      customerList.length >0 ? res.status(200).json(customerList) : res.status(204).send();
    }catch(err){
      res.status(500).json(err);
    }
  },
  async getOneController (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});
      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  }
};
