import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { AddTestInput, Nested, Test } from "../schemas/TestSchema";

@Resolver(of => Test)
export class TestResolver implements ResolverInterface<Test> {

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

function generateUserData(nested: Nested[]): Test[] {
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