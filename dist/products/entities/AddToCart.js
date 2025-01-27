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
exports.addToCart = void 0;
const typeorm_1 = require("typeorm");
const userDetails_1 = require("../../users/entities/userDetails");
const produstDetails_1 = require("./produstDetails");
let addToCart = class addToCart {
};
exports.addToCart = addToCart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], addToCart.prototype, "cartId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userDetails_1.smartUser, (user) => user.cartItems),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", userDetails_1.smartUser)
], addToCart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produstDetails_1.smartProduct, (products) => products.cartItems),
    (0, typeorm_1.JoinColumn)({ name: "productId" }),
    __metadata("design:type", produstDetails_1.smartProduct)
], addToCart.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], addToCart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], addToCart.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], addToCart.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], addToCart.prototype, "added_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "unvarified" }),
    __metadata("design:type", String)
], addToCart.prototype, "status", void 0);
exports.addToCart = addToCart = __decorate([
    (0, typeorm_1.Entity)("addToCart"),
    (0, typeorm_1.Unique)(["cartId"])
], addToCart);
