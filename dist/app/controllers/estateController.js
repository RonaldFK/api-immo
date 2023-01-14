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
    /**
     * Récupère la liste complète des Biens
     * @param _req
     * @param res
     */
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
     * Récupère les informations d'un bien en particulier selon l'ID founie.
     * @param req
     * @param res
     */
    getOneEstateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const estate = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { id: Number(id) }, relations: { location: true, customer: true, manager: true } });
                estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    /**
     * Récupère la liste des biens qui corresponde à un type donné.
     * @param req
     * @param res
     */
    getEstateByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            try {
                const estate = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { type: `${type}` }, relations: { manager: true, customer: true } });
                estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    /**
     * Création d'un nouveau bien
     * @param req
     * @param res
     */
    createEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            if (dataRequest.name === undefined
                || dataRequest.price === undefined
                || dataRequest.type === undefined) {
                res.status(400).json({ Error: 'Formulaire non complet' });
            }
            try {
                const dataToInsert = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Estate_1.Estate)
                    .values({ name: dataRequest.name,
                    price: dataRequest.price,
                    type: dataRequest.type,
                    location_id: dataRequest.location_id
                })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { id: dataToInsert.raw[0].id } });
                res.status(200).json(returnResult);
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    /**
     * Mettre à jour les informations d'un bien
     * @param req
     * @param res
     */
    updateOneEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dataRequest = req.body;
            try {
                yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .update(Estate_1.Estate)
                    .set({ name: dataRequest.name,
                    price: dataRequest.price,
                    type: dataRequest.type,
                    location_id: dataRequest.location_id,
                    parking_id: dataRequest.parking_id,
                    manager_id: dataRequest.manager_id,
                    customer_id: dataRequest.customer_id
                })
                    .where({ id: id })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { id: Number(id) } });
                returnResult.length > 0 ? res.status(200).json(returnResult) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    /**
     * Suppression d'un bien
     * @param req
     * @param res
     */
    deleteOneEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const dataToDelete = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .delete()
                    .from(Estate_1.Estate)
                    .where({ id: Number(id) })
                    .execute();
                dataToDelete.affected === 1 ? res.status(200).json({ Information: 'Supprimé avec succès' }) : res.json({ Information: 'Aucun bien de correspond' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
};
