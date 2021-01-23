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
exports.AddTestInput = exports.Test = exports.Nested = void 0;
const type_graphql_1 = require("type-graphql");
// This type must be placed before Test because it's nested in Test
// This is pretty stupid
let Nested = class Nested {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Nested.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Nested.prototype, "name", void 0);
Nested = __decorate([
    type_graphql_1.ObjectType()
], Nested);
exports.Nested = Nested;
let Test = class Test {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Test.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Test.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], Test.prototype, "num", void 0);
__decorate([
    type_graphql_1.Field(type => Nested, { nullable: true }),
    __metadata("design:type", Nested)
], Test.prototype, "nested", void 0);
Test = __decorate([
    type_graphql_1.ObjectType()
], Test);
exports.Test = Test;
let AddTestInput = class AddTestInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddTestInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], AddTestInput.prototype, "num", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], AddTestInput.prototype, "nestedName", void 0);
AddTestInput = __decorate([
    type_graphql_1.InputType()
], AddTestInput);
exports.AddTestInput = AddTestInput;
