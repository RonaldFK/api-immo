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
exports.managerController = void 0;
const dataSource_1 = require("../data/dataSource");
const Manager_1 = require("../models/Manager");
exports.managerController = {
    getAllManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managerList = yield dataSource_1.dataSource.manager.find(Manager_1.Manager);
                managerList.length > 0 ? res.status(200).json(managerList) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    getOneManagerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const manager = yield dataSource_1.dataSource.getRepository(Manager_1.Manager).find({ where: { id: Number(id) } });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const, prefer-const, prefer-const
                // let formatManagerDataToSend = [];
                // // eslint-disable-next-line prefer-const
                // let format: {[key: number]: string} ={};
                // for (let i = 0; i < manager.length; i++) {
                //   format = manager[i].bien;
                // }
                // formatManagerDataToSend.push(format);
                // manager.push(formatManagerDataToSend);
                // // console.log(newo);
                manager.length > 0 ? res.status(200).json(manager) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    getEstateByManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const estateOfCurrentManager = yield dataSource_1.dataSource.manager
                    .query(`SELECT distinct e.name as biens
      FROM manager as m
      JOIN estate as e
      ON m.id = e.manager_id
      WHERE m.id = ${id}
      order by biens;`);
                estateOfCurrentManager.length > 0 ? res.status(200).json(estateOfCurrentManager) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    createManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            try {
                const dataToInsert = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Manager_1.Manager)
                    .values({
                    firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    password: dataRequest.password,
                    login: dataRequest.login,
                    email: dataRequest.email
                })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Manager_1.Manager).find({ where: { id: dataToInsert.raw[0].id } });
                console.table(returnResult);
                res.status(200).json(returnResult);
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    updateOneManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dataRequest = req.body;
            try {
                yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .update(Manager_1.Manager)
                    .set({
                    firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    password: dataRequest.password,
                    login: dataRequest.login,
                    email: dataRequest.email
                })
                    .where({ id: id })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Manager_1.Manager).find({ where: { id: Number(id) } });
                returnResult.length > 0 ? res.status(200).json(returnResult) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    deleteOneManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const dataToDelete = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .delete()
                    .from(Manager_1.Manager)
                    .where({ id: Number(id) })
                    .execute();
                dataToDelete.affected === 1 ? res.status(200).json({ Information: 'Supprimé avec succès' }) : res.json({ Information: 'Aucun bien de correspond' });
            }
            catch (err) {
                console.log(err);
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
};
