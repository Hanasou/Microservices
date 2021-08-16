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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolver = void 0;
const type_graphql_1 = require("type-graphql");
const test_schema_1 = require("../schemas/test-schema");
/**
 * Query Example
 * query {
 *   test(id: "23") {
 *     // Include all the fields that we want returned. It can include some, all, or none of them
 *     id
 *     name
 *     num
 *     nested {
 *       id
 *       name
 *     }
 *   }
 * }
 */
/**
 * Mutation Example
 * Note that the thing inside the mutation is just a query. $test is the variable we're passing in to add into our data
 * The values inside addTest is what we're querying for as a response.
 * mutation AddTest($test: AddTestInput!) {
 *   addTest(test: $test) {
 *     id
 *     name
 *     num
 *     nested {
 *       id
 *       name
 *     }
 *   }
 * }
 *
 * Example Variable
 * {
 *   "test": {
 *     "name": "Example",
 *     "num": 99
 *     "nestedName": "Nested Example"
 *   }
 * }
 */
let TestResolver = class TestResolver {
    constructor() {
        this.nestedCollection = generateNestedData();
        this.testCollection = generateTestData(this.nestedCollection);
    }
    async tests() {
        return await this.testCollection;
    }
    // This decorator marks this function as a GraphQl query
    // Queries are essentially how we get data
    // Method signature.
    async test(
    // Argument decorator and parameter. We're passing in an id string into this method.
    id) {
        const test = await this.testCollection.find(test => test.id === id);
        return test;
    }
    // The mutation decorator is used when we want to modify data
    async addTest(addTestInput // Take in our AddUserInput InputType
    ) {
        let nestedName = "Undefined";
        if (addTestInput.nestedName) {
            nestedName = addTestInput.nestedName;
        }
        // Find the name of the company the user put in
        let nested = this.nestedCollection.find(nested => nested.name === nestedName);
        // If we can't find it then default to unemployed
        if (nested === undefined) {
            nested = createNested({
                name: "Undefined",
            });
        }
        // Create a user with Object.assign
        // They explicitly said to not use a constructor so I guess I have to do it like this?
        const test = Object.assign(new test_schema_1.Test(), {
            id: Math.floor(Math.random() * 100000).toString(),
            name: addTestInput.name,
            num: addTestInput.num,
            nested: nested,
        });
        // Push user to our pseudo-database
        await this.testCollection.push(test);
        // return
        return test;
    }
    // The FieldResolver decoration is used to get nested fields
    async nested(test) {
        return await test.nested;
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(returns => [test_schema_1.Test]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "tests", null);
__decorate([
    type_graphql_1.Query(returns => test_schema_1.Test, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "test", null);
__decorate([
    type_graphql_1.Mutation(returns => test_schema_1.Test),
    __param(0, type_graphql_1.Arg("test")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_schema_1.AddTestInput // Take in our AddUserInput InputType
    ]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "addTest", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_schema_1.Test]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "nested", null);
TestResolver = __decorate([
    type_graphql_1.Resolver(of => test_schema_1.Test)
], TestResolver);
exports.TestResolver = TestResolver;
// Helper Functions and Constants
const randomModifier = 100000;
function generateId(modifier) {
    return Math.floor(Math.random() * modifier).toString();
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function createTest(testData) {
    const test = Object.assign(new test_schema_1.Test(), testData);
    test.id = generateId(randomModifier);
    return test;
}
function createNested(nestedData) {
    const nested = Object.assign(new test_schema_1.Test(), nestedData);
    nested.id = generateId(randomModifier);
    return nested;
}
function generateNestedData() {
    return [
        createNested({
            name: "Nested1",
        }),
        createNested({
            name: "Nested2",
        }),
        createNested({
            name: "Nested3",
        }),
        createNested({
            name: "Nested4",
        }),
    ];
}
function generateTestData(nested) {
    const usersData = [
        createTest({
            name: "Roy",
            num: 22,
            nested: nested[getRandomInt(0, nested.length)],
        }),
        createTest({
            name: "Todd",
            num: 43,
            nested: nested[getRandomInt(0, nested.length)],
        }),
        createTest({
            name: "Bill",
            num: 66,
            nested: nested[getRandomInt(0, nested.length)],
        }),
        createTest({
            name: "Bob",
            num: 83,
            nested: nested[getRandomInt(0, nested.length)],
        }),
    ];
    return usersData;
}
