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
exports.smartProduct = void 0;
const typeorm_1 = require("typeorm");
const productsCategory_1 = require("./productsCategory");
let smartProduct = class smartProduct {
};
exports.smartProduct = smartProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], smartProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => productsCategory_1.smartCategory, (category) => category.products, { onDelete: "CASCADE", onUpdate: "CASCADE", eager: true }),
    __metadata("design:type", String)
], smartProduct.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], smartProduct.prototype, "stockQuanity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "productDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], smartProduct.prototype, "image", void 0);
exports.smartProduct = smartProduct = __decorate([
    (0, typeorm_1.Entity)("smartProducts"),
    (0, typeorm_1.Unique)(["productId"])
], smartProduct);
