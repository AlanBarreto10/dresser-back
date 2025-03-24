import { IsString, MinLength } from "class-validator";

export class CreateSubCategoryDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    categoryName: string;

}