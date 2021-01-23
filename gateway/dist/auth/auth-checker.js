"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
const customAuthChecker = ({ context }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log("Entering Auth Checker");
    console.log(context.headers);
    return true; // or false if access is denied
};
exports.customAuthChecker = customAuthChecker;
