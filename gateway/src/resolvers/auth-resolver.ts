import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { AddUserInput, User } from "../schemas/user-schema";
import { AuthServiceClient } from "../protobuf/auth";
import grpc from '@grpc/grpc-js';
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

//const authClient = new AuthServiceClient("localhost:4001", grpc.credentials.createInsecure());
@Resolver(of => User)
export class AuthResolver {

    @Query(returns => User, {nullable: true})
    // Method signature.
    async user(
        // Argument decorator and parameter. We're passing in an id string into this method.
        @Arg("id") id: string
    ): Promise<User | undefined> { // We're returning a promise or undefined if we can't find
        return undefined;
    }

    @Mutation(returns => User)
    async addUser(
        @Arg("user") addUserInput: AddUserInput // Take in our AddUserInput InputType
    ): Promise<User> { 
        const user = Object.assign(new User(), {
            username: addUserInput.username,
            num: addUserInput.password,
        });
        return user;
    }
}

