import { Request,Response } from 'express';
import bcrypt from 'bcrypt';
import {schema} from '../dataValidation/joi';
import { Manager } from '../models/Manager';
import { dataSource } from '../data/dataSource';
import { tokenController } from './tokenController';


const saltRounds = 10;

export const authController = {
  /**
   * Function de création de compte
   * @param {*} req // Récupère les infos de création de compte.
   * @param {*} res // Renvoie message de confirmation ou erreur
   * @returns // On Retourne un statut 200 si le process ok
   */
  async signupAccount (req:Request, res:Response) {

    const dataRequest = <typeManager>req.body;
    // Vérification format de données avec Joi
    const verif = schema.validate({
      firstname:dataRequest.firstname,
      lastname:dataRequest.lastname,
      email:dataRequest.email,
      password:dataRequest.password,
    });

    if (verif.error?.details[0].message) {
      return res.status(400).json({Information:`${verif.error?.details[0].message}`});
    }
    // Récupération du hash du password avant stockage en bdd
    if(dataRequest?.password){
      const hashPassword = await bcrypt.hash(dataRequest.password, saltRounds);
      dataRequest.password = hashPassword;
    }

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(Manager)
        .values(
          dataRequest
        )
        .execute();
      res.status(200).json({Information:'Votre compte à été créé'});

    }
    catch(err) {
      console.log(err);
    }
  },
  /**
     * Fonction d'authentification et renvoie d'un token de session
     * @param {*} req // Doit récupérer le crédentital ( login, passowrd) du user.
     * @param {*} res // Il renvoie ma page et construit mon objet de session
     * @returns // On bloque le processus en cas de mauvais login ou password.
     */
  async signinAccess (req:Request, res:Response) {
    const dataRequest = <signinManager>req.body;

    const dataToControl = await dataSource.getRepository(Manager).find({where:{login:dataRequest.login}});


    try {
      const decryptPassword = await bcrypt.compare(
        dataRequest.password,
        dataToControl[0].password,
      );

      // vérification correspondance login et mdp input et base
      if (decryptPassword === false) {
        return res.status(401).json({Information: 'Mot de passe incorrect'});
      }
      const tokenUser = await tokenController.genToken({login:dataToControl[0].login});
      res.json({Info:'tout est ok',tokenUser,userId:dataToControl[0].id});

    } catch (err) {
      console.log(err);
      return res.status(500).json({Information : 'Mot de passe ou login incorrect'});
    }
  },
};


