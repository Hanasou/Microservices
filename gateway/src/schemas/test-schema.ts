import {ObjectType, Field, ID, Int, InputType, Authorized} from "type-graphql";

// This typed is a type that's nested in our Test type
// This type must be placed before Test because it's nested in Test
// This is pretty stupid
@ObjectType()
export class Nested {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
}

@ObjectType()
export class Test {

    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => Int)
    num: number;

    @Field(type => Nested, { nullable: true })
    nested: Nested;

}


@InputType()
export class AddTestInput {
    @Field()
    name: string;

    @Field(type => Int)
    num: number;

    @Field({ nullable: true })
    nestedName: string;
}