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
    getOneEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const estate = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).findBy({ id: Number(id) });
                console.log(estate);
                estate.length > 0 ? res.status(200).json(estate) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
};
