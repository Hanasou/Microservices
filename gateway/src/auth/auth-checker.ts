import { Request } from "express";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<Request> = ({ root, args, context, info }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log("Entering Auth Checker");
    console.log(root);
    console.log(args);
    console.log(context);
    console.log(info);
    console.log(roles);
    return true; // or false if access is denied
  };