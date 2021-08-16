import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { AddTestInput, Nested, Test } from "../schemas/test-schema";

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
@Resolver(of => Test)
export class TestResolver implements ResolverInterface<Test> {

    private readonly nestedCollection: Nested[] = generateNestedData();
    private readonly testCollection: Test[] = generateTestData(this.nestedCollection);

    @Authorized()
    @Query(returns => [Test])
    async tests(): Promise<Test[]> {
        return await this.testCollection;
    }

    // This decorator marks this function as a GraphQl query
    // Queries are essentially how we get data
    @Query(returns => Test, {nullable: true})
    // Method signature.
    async test(
        // Argument decorator and parameter. We're passing in an id string into this method.
        @Arg("id") id: string
    ): Promise<Test | undefined> { // We're returning a promise or undefined if we can't find
        const test = await this.testCollection.find(test => test.id === id);
        return test;
    }

    // The mutation decorator is used when we want to modify data
    @Mutation(returns => Test)
    async addTest(
        @Arg("test") addTestInput: AddTestInput // Take in our AddUserInput InputType
    ): Promise<Test> {
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
        const test = Object.assign(new Test(), {
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
    @FieldResolver()
    async nested( @Root() test: Test ): Promise<Nested> {
        return await test.nested;
    }
}

// Helper Functions and Constants
const randomModifier: number = 100000;

function generateId(modifier: number): string {
    return Math.floor(Math.random() * modifier).toString();
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function createTest(testData: Partial<Test>): Test {
    const test = Object.assign(new Test(), testData);
    test.id = generateId(randomModifier);
    return test;
}

function createNested(nestedData: Partial<Nested>): Nested {
    const nested = Object.assign(new Test(), nestedData);
    nested.id = generateId(randomModifier);
    return nested;
}

function generateNestedData(): Nested[] {
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

function generateTestData(nested: Nested[]): Test[] {
    const usersData = [
        createTest({
            name: "Roy",
            num: 22,
            nested: nested[getRandomInt(0,nested.length)],
        }),
        createTest({
            name: "Todd",
            num: 43,
            nested: nested[getRandomInt(0,nested.length)],
        }),
        createTest({
            name: "Bill",
            num: 66,
            nested: nested[getRandomInt(0,nested.length)],
        }),
        createTest({
            name: "Bob",
            num: 83,
            nested: nested[getRandomInt(0,nested.length)],
        }),
    ];
    return usersData;
}