import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';

import { Request, Response } from 'express';


export const statController = {
  /**
   * Récupère la liste complète des Biens
   * @param _req
   * @param res
   */
  async getEstate(_req: Request, res: Response) {
    try {
      const test = await dataSource.manager.query('select count(id),date_of_selling, to_char(date_of_selling, \'Month\') as test from estate group by date_of_selling order by date_of_selling');
      res.json(test);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getMonth(_req: Request, res: Response) {
    const object:string[] = [];
    try {
      const allMonth = await dataSource.manager.query('select to_char(created_at, \'Month\') as Mois from estate group by Mois      order by Mois');
      allMonth.map(month => {
        object.push(month.mois);

      });
      res.json(object);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
