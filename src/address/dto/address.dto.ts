import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAddressDto {
  @IsString()
  @ApiProperty({ type: String })
  street: string;

  @IsString()
  @ApiProperty({ type: String })
  suburb: string;

  @IsString()
  @ApiProperty({ type: String })
  state: string;

  @IsString()
  @ApiProperty({ type: String })
  postCode: string;

  @IsString()
  @ApiProperty({ type: String })
  fullAddress: string;
}

// export class UpdateAddressDto extends PartialType(CreateAddressDto) {} // TODO: this format does not show the example value in swagger
export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  street: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  suburb: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  state: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  postCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  fullAddress: string;
}
