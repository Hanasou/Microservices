import {ObjectType, Field, ID, Int, InputType} from "type-graphql";

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

@ObjectType()
export class Nested {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
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