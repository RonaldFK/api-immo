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
exports.renterController = void 0;
const dataSource_1 = require("../data/dataSource");
exports.renterController = {
    getAllRenter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const renterList = yield dataSource_1.dataSource.manager.query(`SELECT * FROM renters`);
                console.table(renterList);
                renterList.length > 0 ? res.status(200).json(renterList) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        });
    }
};
