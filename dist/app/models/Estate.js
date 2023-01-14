"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estate = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
const Location_1 = require("./Location");
const Manager_1 = require("./Manager");
let Estate = class Estate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Estate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Estate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estate.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Estate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Estate.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Estate.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estate.prototype, "location_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estate.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estate.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Location_1.Location, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", Location_1.Location)
], Estate.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", Customer_1.Customer)
], Estate.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Manager_1.Manager, (manager) => manager.id),
    (0, typeorm_1.JoinColumn)({ name: "manager_id" }),
    __metadata("design:type", Manager_1.Manager)
], Estate.prototype, "manager", void 0);
Estate = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["name"])
], Estate);
exports.Estate = Estate;
