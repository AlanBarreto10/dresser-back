import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, isString, IsString, IsUUID, MinLength } from "class-validator";
import { Gender } from "../utils/enum_gender";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsEnum(Gender)
    gender: Gender;
    
    @IsNumber()
    @IsNotEmpty()
    subCategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    sizeId: number;

    @IsNumber()
    @IsNotEmpty()
    colorId: number;

    @IsUUID()
    userId: string 

    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    images: string[]
}
