import { Request } from "express";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<Request> = ({ context }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log("Entering Auth Checker");
    console.log(context.headers);
    return true; // or false if access is denied
};