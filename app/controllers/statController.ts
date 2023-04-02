import { dataSource } from '../data/dataSource';
import { Estate } from '../models/Estate';

import { Request, Response } from 'express';



export const statController = {
  /**
   * Récupère lnom de bien en vente par mois
   * @param _req
   * @param res
   */
  async getEstateToSell(_req: Request, res: Response) {

    const initMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
    const data : string[] = [];
    try {
      const test = await dataSource.manager.query('select date_part(\'month\', created_at) as Mois,count(id) from estate where statut = \'vendu\' group by Mois order by Mois');
      test.map(elem=>{
        data.push(elem.count);
      });
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getMonth(_req: Request, res: Response) {
    const initMonth= [
      { label: 'Janvier', num_month: 1 },
      { label: 'Février', num_month: 2 },
      { label: 'Mars', num_month: 3 },
      { label: 'Avril', num_month: 4 },
      { label: 'Mai', num_month: 5 },
      { label: 'Juin', num_month: 6 },
      { label: 'Juillet', num_month: 7 },
      { label: 'Août', num_month: 8 },
      { label: 'Septembre', num_month: 9 },
      { label: 'Octobre', num_month: 10 },
      { label: 'Novembre', num_month: 11 },
      { label: 'Décembre', num_month: 12 }
    ];
    const object:string[] = [];
    try {
    //   const allMonth = await dataSource.manager.query(`select distinct  date_part('month', created_at) AS mois from estate
    //   group by date_part('month', created_at)
    //   order by date_part('month', created_at)`);
      initMonth.map(elem => {
        object.push(elem.label);

      });
      res.json(object);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
