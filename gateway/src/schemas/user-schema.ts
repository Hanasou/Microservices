import {ObjectType, Field, ID, Int, InputType, Authorized} from "type-graphql";

@ObjectType()
export class User {

    @Field(type => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    password: string; 
}

@InputType()
export class AddUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}