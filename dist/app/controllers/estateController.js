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
Object.defineProperty(exports, "__esModule", { value: true });
exports.estateController = void 0;
const dataSource_1 = require("../data/dataSource");
const Estate_1 = require("../models/Estate");
exports.estateController = {
    getAllEstate(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estateList = yield dataSource_1.dataSource.manager.find(Estate_1.Estate);
                estateList.length > 0 ? res.status(200).json(estateList) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    /**
     *
     * @param req // Récupère l'id du biens recherché
     * @param res
     */
    getOneEstateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const regexNumber = /^([0-9])$/g;
            const testRegexNumber = regexNumber.test(id);
            if (testRegexNumber === false) {
                return res.status(400).json({ Error: 'Id incorrecte, merci de vérifier celui-ci' });
            }
            try {
                const estate = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { id: Number(id) }, relations: { location: true, parking: true } });
                estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    /**
     *
     * @param req // Récupère le type de biens recherché
     * @param res
     */
    getEstateByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const regexString = /^([a-zA-Z]{2,})$/g;
            const testRegex = regexString.test(type);
            // Vérification syntaxique du type demandé
            if (testRegex === false) {
                return res.status(400).json({ Error: 'Recherche erronée, vérifier le type demandé' });
            }
            try {
                const estate = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { type: `${type}` } });
                estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    /**
     *
     * @param req // Récupère les infos du formulaire pour la création d'un bien
     * @param res
     */
    createEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, type } = req.body;
            if (name === undefined || price === undefined || type === undefined) {
                res.status(400).json({ Error: 'Formulaire non complet' });
            }
            try {
                const dataToInsert = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Estate_1.Estate)
                    .values({ name: name,
                    price: price,
                    type: type })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { id: dataToInsert.raw[0].id } });
                res.status(200).json(returnResult);
            }
            catch (err) {
                // Controle du code d'erreur, puis renvoie d'un message clair à l'utilisateur et detail erreur
                err.driverError.code === '23505' && res.status(500).json({ DétailError: err.driverError.detail, Message: 'Violation de contrainte, donnée existante' });
            }
        });
    }
};
