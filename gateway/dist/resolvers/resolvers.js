"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const test_resolver_1 = require("./test-resolver");
// This is where we add all our resolvers
// Sort of like registering them I guess
exports.resolvers = [
    test_resolver_1.TestResolver,
];
