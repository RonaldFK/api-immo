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
exports.customerController = void 0;
const dataSource_1 = require("../data/dataSource");
const Customer_1 = require("../models/Customer");
exports.customerController = {
    getAllCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerList = yield dataSource_1.dataSource.manager.find(Customer_1.Customer);
                customerList.length > 0 ? res.status(200).json(customerList) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    getOneController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const customer = yield dataSource_1.dataSource.getRepository(Customer_1.Customer).find({ where: { id: Number(id) } });
                customer.length > 0 ? res.status(200).json(customer) : res.status(204).send();
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
};
