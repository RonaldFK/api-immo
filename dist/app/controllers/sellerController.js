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
exports.sellerController = void 0;
const dataSource_1 = require("../data/dataSource");
exports.sellerController = {
    getAllSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerList = yield dataSource_1.dataSource.manager.query(`SELECT * FROM sellers`);
                console.table(sellerList);
                sellerList.length > 0 ? res.status(200).json(sellerList) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        });
    }
};
