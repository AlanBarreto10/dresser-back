import {IsString, MinLength } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @MinLength(1)
    type: string;

}