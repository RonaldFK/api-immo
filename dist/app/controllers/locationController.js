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
exports.locationController = void 0;
const Location_1 = require("../models/Location");
const dataSource_1 = require("../data/dataSource");
exports.locationController = {
    getAllLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationList = yield dataSource_1.dataSource.manager.find(Location_1.Location);
                locationList.length > 0 ? res.status(200).json(locationList) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    getOneLocationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const location = yield dataSource_1.dataSource.getRepository(Location_1.Location).find({ where: { id: Number(id) } });
            try {
                location.length > 0 ? res.status(200).json(location) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    createLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { num, street, city, country, code } = req.body;
            const dataToInsert = yield dataSource_1.dataSource
                .createQueryBuilder()
                .insert()
                .into(Location_1.Location)
                .values({ num: num,
                street: street,
                city: city,
                country: country,
                code: code
            })
                .execute();
            const returnResult = yield dataSource_1.dataSource.getRepository(Location_1.Location).find({ where: { id: dataToInsert.raw[0].id } });
            res.status(200).json(returnResult);
        });
    }
};