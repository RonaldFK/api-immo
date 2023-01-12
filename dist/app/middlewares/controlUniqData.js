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
exports.controlUniqData = void 0;
const dataSource_1 = require("../data/dataSource");
const Customer_1 = require("../models/Customer");
const Estate_1 = require("../models/Estate");
const Location_1 = require("../models/Location");
exports.controlUniqData = {
    uniqueDataControlEstate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            if (dataRequest.name === undefined
                || dataRequest.price === undefined
                || dataRequest.type === undefined) {
                return res.status(400).json({ Error: 'Formulaire non complet' });
            }
            const dataToControl = yield dataSource_1.dataSource.getRepository(Estate_1.Estate).find({ where: { name: dataRequest.name } });
            if (dataToControl.length > 0) {
                return res.status(400).json({ Error: 'Ce bien a déjà été créé' });
            }
            next();
        });
    },
    /**
     * Controle de l'unicité de la demande de création.
     * @param req
     * @param res
     * @param next
     * @returns
     */
    uniqueDataControlLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { num, street, city, country, code } = req.body;
            if (num === undefined || street === undefined || city === undefined || country === undefined || code === undefined) {
                return res.status(400).json({ Error: 'Formulaire non complet' });
            }
            const dataToControl = yield dataSource_1.dataSource.getRepository(Location_1.Location).find({ where: { num: num, street: street, city: city, country: country, code: code } });
            if (dataToControl.length > 0) {
                return res.status(400).json({ Error: 'Cette localisation existe déjà' });
            }
            next();
        });
    },
    uniqueDataControlCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            if (dataRequest.firstname === undefined
                || dataRequest.lastname === undefined
                || dataRequest.tel === undefined
                || dataRequest.cash_or_credit === undefined
                || dataRequest.date_of_selling === undefined) {
                return res.status(400).json({ Error: 'Formulaire non complet' });
            }
            const dataToControl = yield dataSource_1.dataSource.getRepository(Customer_1.Customer).find({ where: { firstname: dataRequest.firstname, lastname: dataRequest.lastname, tel: Number(dataRequest.tel), cash_or_credit: dataRequest.cash_or_credit, date_of_selling: new Date(dataRequest.date_of_selling) } });
            if (dataToControl.length > 0) {
                return res.status(400).json({ Error: 'Ce client existe déjà' });
            }
            next();
        });
    },
};
