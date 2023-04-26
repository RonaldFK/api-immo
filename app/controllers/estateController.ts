import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';
import { uploadFile } from '../middlewares/uploadFile';
import { Request, Response } from 'express';
import { Photo } from '../models/Photo';
import {convertPrice} from '../tools/formatPrice';
import { any, number } from 'joi';
export const estateController = {
  /**
   * Récupère la liste complète des Biens
   * @param _req
   * @param res
   * @returns {Array} Tableau d'objets
   */
  async getAllEstate(_req: Request, res: Response) {
    try {
      const estateList = await dataSource
      .getRepository(Estate)
      .find({
       
        relations: {
   
          photos: true,
        },
      });
      estateList.map(elem => {
        elem.price = convertPrice(elem?.price);
      });
      estateList.length > 0
        ? res.status(200).json(estateList.sort())
        : res.status(204).send();

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Récupère les informations d'un bien en particulier selon l'ID founie.
   * @param req
   * @param res
   * @returns Un objet unique
   */
  async getOneEstateById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const estate = await dataSource
        .getRepository(Estate)
        .find({
          where: { id: Number(id) },
          relations: {
            location: true,
            customer: true,
            manager: true,
            photos: true,
          },
        });
        estate[0]?.price && estate[0].price = convertPrice(estate[0].price);

      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Récupère la liste des biens qui corresponde à un type donné.
   * @param req
   * @param res
   */
  async getEstateByType(req: Request, res: Response) {
    const type = req.params.type;

    try {
      const estate = await dataSource
        .getRepository(Estate)
        .find({
          where: { type: `${type}` },
          relations: { manager: true, customer: true },
        });
      estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * Création d'un nouveau bien
   * @param req
   * @param res
   */
  async createEstate(req: Request, res: Response) {
    console.log('ESTATE');

    let dataRequest;
    if (req.body?.estate) {
      dataRequest = JSON.parse(req.body.estate);
    }
    console.log(dataRequest,'DANS LE CONTROLLER');

    (dataRequest.manager_id === '') && (dataRequest.manager_id = null);
    (dataRequest.location_id === '') && (dataRequest.location_id = null);

    if (
      dataRequest.name === undefined ||
      dataRequest.price === undefined ||
      dataRequest.type === undefined
    ) {
      res.status(400).json({ Error: 'Formulaire non complet' });
    }

    try {
      const dataToInsert = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Estate)
        .values(dataRequest)
        .execute();
      // Ajout des photos
      if (req?.files) {
        for (let i = 0; i < req?.files.length; i++) {
          await dataSource
            .createQueryBuilder()
            .insert()
            .into(Photo)
            .values({
              name: req.files[i]?.filename,
              estate_id: dataToInsert?.raw[0]?.id,
            })
            .execute();
        }
      }

      const returnResult = await dataSource
        .getRepository(Estate)
        .find({
          where: { id: dataToInsert?.raw[0]?.id },
          relations: { photos: true },
        });
      res.status(200).json(returnResult[0]);
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * Mettre à jour les informations d'un bien
   * @param req
   * @param res
   */
  async updateOneEstate(req: Request, res: Response) {
    const id = Number(req.params.id);
    let dataRequest;
    if (req.body?.estate) {
      dataRequest = <typeEstate>JSON.parse(req.body.estate);
    }

    try {
      await dataSource
        .createQueryBuilder()
        .update(Estate)
        .set(<typeEstate>dataRequest)
        .where({ id: id })
        .execute();

      const returnResult = await dataSource
        .getRepository(Estate)
        .find({ where: { id: id } });
      console.log(returnResult);

      // Ajout des photos
      if (req?.files) {
        for (let i = 0; i < req?.files.length; i++) {
          await dataSource
            .createQueryBuilder()
            .insert()
            .into(Photo)
            .values({ name: req.files[i]?.filename, estate_id: id })
            .execute();
        }
      }
      returnResult.length > 0
        ? res.status(200).json(returnResult)
        : res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  /**
   * Suppression d'un bien
   * @param req
   * @param res
   */
  async deleteOneEstate(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const dataToDelete = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Estate)
        .where({ id: Number(id) })
        .execute();

      dataToDelete.affected === 1
        ? res.status(200).json({ Information: 'Supprimé avec succès' })
        : res.json({ Information: 'Aucun bien de correspond' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getPhoto(req: Request, res: Response) {

    const fileName = req.params.name;
    const directoryPath = 'app/assets/';

    res.download(directoryPath + fileName, fileName, (err) => {
      console.log('DOWNLOAD');

      if (err) {
        res.status(500).send({
          message: 'Impossible de trouver le fichier ' + err,
        });
      }
    });
  },
};
