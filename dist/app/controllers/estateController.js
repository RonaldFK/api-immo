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
    getAllEstate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estateList = yield dataSource_1.dataSource.manager.find(Estate_1.Estate);
                res.status(200).json(estateList);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
