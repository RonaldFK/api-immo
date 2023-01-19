"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = require("../dataValidation/joi");
const Manager_1 = require("../models/Manager");
const dataSource_1 = require("../data/dataSource");
// import transporter from '../dataValidation/nodeMailer';
const saltRounds = 10;
exports.authController = {
    /**
     *
     * @param {*} req // Récupère les infos de création de compte.
     * @param {*} res // Renvoie ma page
     * @returns // On bloque le processus en cas de mauvais login ou password.
     */
    signupAccount(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TEST PASSAGE');
            const dataRequest = req.body;
            // récupération du retour de la validation
            const verif = joi_1.schema.validate({
                firstname: dataRequest.firstname,
                lastname: dataRequest.lastname,
                email: dataRequest.email,
                password: dataRequest.password,
            });
            console.log(verif.error);
            if ((_a = verif.error) === null || _a === void 0 ? void 0 : _a.details[0].message) {
                return res.status(400).json({ Information: `${(_b = verif.error) === null || _b === void 0 ? void 0 : _b.details[0].message}` });
            }
            // Récupération du hash du password avant stockage en bdd
            const hashPassword = yield bcrypt_1.default.hash(dataRequest.password, saltRounds);
            try {
                const dataToInsert = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Manager_1.Manager)
                    .values({
                    firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    password: hashPassword,
                    login: dataRequest.login,
                    email: dataRequest.email
                })
                    .execute();
                console.log(dataToInsert);
                res.status(200).json({ Information: 'Votre compte à été créé' });
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    //   /**
    //    *
    //    * @param {*} req // Doit récupérer le crédentital ( login, passowrd) du user.
    //    * @param {*} res // Il renvoie ma page et construit mon objet de session
    //    * @returns // On bloque le processus en cas de mauvais login ou password.
    //    */
    signinAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            // const test:typeManager = ['un','deux'];
            const dataToControl = yield dataSource_1.dataSource.getRepository(Manager_1.Manager).find({ where: { login: dataRequest.login } });
            console.log(dataToControl);
            // if (dataToControl.length != 1) {return res.status(400).json({Information:'Votre compte n\'existe pas'});}
            // // autorisation spécifique pour le user admin natif
            // if (login === 'admin') return res.render('listOfAcces');
            // dataToControl = dataToControl[0];
            try {
                const decryptPassword = yield bcrypt_1.default.compare(dataRequest.password, dataToControl[0].password);
                // vérification correspondance login et mdp input et base
                if (decryptPassword === false) {
                    return res.status(401).json({ Information: 'Mot de passe incorrect' });
                }
                res.json('tout est ok');
                //   req.session.user = currentUser;
                //   res.render('listOfAcces');
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ Information: 'Mot de passe ou login incorrect' });
            }
        });
    },
};
