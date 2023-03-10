import { ApiProperty } from "@nestjs/swagger";
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger/dist";
import { ParkAction } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateParkDto {
    @ApiProperty()
    @IsString()
    parkName: string;

    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    parkCap: number;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    currentPark: number;
}

export class UpdateParkDto extends PartialType(CreateParkDto) {}

export class CreateParkDetailDto {
    @ApiProperty()
    action: ParkAction;

    @ApiProperty()
    parkAt: string;
}