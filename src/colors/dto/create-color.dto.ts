import { IsString, MinLength } from "class-validator";

export class CreateColorDto {
    
    @IsString()
    @MinLength(1)
    name: string;
    
    @IsString()
    @MinLength(6)
    codigo_hexadecimal: string;

}
