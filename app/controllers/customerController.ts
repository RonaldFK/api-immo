import {Request,Response}from 'express';
import { ILike } from 'typeorm';
import { dataSource } from '../data/dataSource';
import { Customer } from '../models/Customer';

export const customerController = {
  /**
   * Récupère la liste de tous les clients
   * @param {*} req
   * @param {*} res
   * @returns {Array} // On Retourne tableau d'objet
   */
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
  /**
   * Cherche une correspondance sur le nom d'un client
   * @param {*} req
   * @param {*} res
   * @returns {Array} // On Retourne tableau d'objet
   */
  async searchCustomer (req:Request,res:Response){
    const search = req.params.name;
    console.log(typeof search);

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{lastname:ILike(`${search}%`)}});
      console.log(customer);

      customer.length >0 ? res.status(200).json(customer) : res.status(204).send();
    }catch(err){
      console.log(err);

      res.status(500).json(err);
    }
  },
  /**
   * Récupère les information du client correspondant à l'ID
   * @param {number} req Id du client
   * @param {*} res
   * @returns {Object} // On Retourne un objet avec les informations
   */
  async getOneCustomerById (req:Request,res:Response) {
    const {id} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});

      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  /**
   * Récupère les information du client correspondant à son type
   * @param {String} req type de clients
   * @param {*} res
   * @returns {Object} // On Retourne un objet avec les informations
   */
  async getOneCustomerByType (req:Request,res:Response) {
    const {type} = req.params;

    try{
      const customer = await dataSource.getRepository(Customer).find({where:{type_of_customer:type}});
      customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();

    } catch(err){
      res.status(500).json(err);
    }
  },
  /**
   * Créer un nouveau client
   * @param {Object} req information du client à créer
   * @param {*} res
   * @returns {}  Statut 200 si création ok
   * @throws Statut 500 si création non ok
   */
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
  /**
   * Mise à jour d'un client
   * @param {Object} req information du client à mettre à jour
   * @param {*} res
   * @returns {}  Statut 200 avec les nouvelles informations
   * @throws Statut 500 avec l'erreur
   */
  async updateOneCustomer (req:Request,res:Response) {
    const {id} = req.params;
    const dataRequest = <typeCustomer>req.body;

    try{
      await dataSource
        .createQueryBuilder()
        .update(Customer)
        .set(dataRequest)
        .where( { id: id })
        .execute();

      const returnResult = await dataSource.getRepository(Customer).find({where:{id:Number(id)}});
      returnResult.length>0 ? res.status(200).json(returnResult) : res.status(204).send();

    } catch(err){console.log(err);
      console.log(err);

      res.status(500).json(err);
    }
  },
  /**
   * Créer un nouveau client
   * @param {} req Id du client
   * @param {*} res
   * @returns {}  Statut 200 ou indication de la non correspondance
   * @throws Statut 500 si création non ok
   */
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
