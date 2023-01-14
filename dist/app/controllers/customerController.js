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
                console.log('test');
                const customerList = yield dataSource_1.dataSource.manager.find(Customer_1.Customer);
                customerList.length > 0 ? res.status(200).json(customerList) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    getOneCustomer(req, res) {
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
    },
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = req.body;
            try {
                const dataToInsert = yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Customer_1.Customer)
                    .values({ id: dataRequest.id,
                    firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    tel: dataRequest.tel,
                    type_of_customer: dataRequest.type_of_customer,
                    cash_or_credit: dataRequest.cash_or_credit,
                    date_of_selling: dataRequest.date_of_selling
                })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Customer_1.Customer).find({ where: { id: dataToInsert.raw[0].id } });
                console.table(returnResult);
                res.status(200).json(returnResult);
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },
    updateOneCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dataRequest = req.body;
            try {
                yield dataSource_1.dataSource
                    .createQueryBuilder()
                    .update(Customer_1.Customer)
                    .set({ firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    tel: dataRequest.tel,
                    type_of_customer: dataRequest.type_of_customer,
                    cash_or_credit: dataRequest.cash_or_credit,
                    date_of_selling: dataRequest.date_of_selling
                })
                    .where({ id: id })
                    .execute();
                const returnResult = yield dataSource_1.dataSource.getRepository(Customer_1.Customer).find({ where: { id: Number(id) } });
                returnResult.length > 0 ? res.status(200).json(returnResult) : res.status(204).send();
            }
            catch (err) {
                console.log(err);
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
};
