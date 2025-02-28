import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

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

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({each: true}) //cada elemento tiene que ser string
    @IsArray()
    sizes: string[];
    
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    images?: string[]
}
