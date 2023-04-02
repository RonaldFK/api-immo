import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';

import { Request, Response } from 'express';
const initMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



export const statController = {
  /**
   * Récupère lnom de bien en vente par mois
   * @param _req
   * @param res
   */
  async getEstateToSell(_req: Request, res: Response) {

    const array = [];

    try {
      const data = await dataSource.manager.query(`select distinct  date_part('month', created_at) as Mois,count(id) from estate
      group by date_part('month', created_at)
      order by Mois`);
      if(data){

        for (const i of initMonth) {
          const testing = data.find((elem) => elem.mois === i);
          if (testing) {
            array.push(testing.count);
          } else {
            array.push(null);
          }
        }
        res.status(200).json(array);
      }else{
        res.status(400).send();
      }


    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getEstateSoldOut(_req: Request, res: Response) {
    const array : string[] = [];
    try {
      const data = await dataSource.manager.query(`select date_part('month', date_of_selling) as Mois,count(id) from estate
      where statut = 'vendu'
      group by Mois
      order by Mois`);

      for (const i of initMonth) {
        const testing = data.find((elem) => elem.mois === i);
        if (testing) {
          array.push(testing.count);
        } else {
          array.push(null);
        }
      }
      res.json(array);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
