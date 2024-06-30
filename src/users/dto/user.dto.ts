import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from 'src/address/dto/address.dto';

export class CreateUserDto {
  // TODO: how to extend from user dto while keeping swagger doc
  @IsString()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  avatar?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  addressId: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {} // TODO: how to keep swagger docs when extending
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  lastName: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String })
  email: string;

  @IsStrongPassword()
  @IsOptional()
  @ApiProperty({ type: String })
  password: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ type: UpdateAddressDto })
  address: UpdateAddressDto;
}

export class UserResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  addressId: string;

  @IsDateString()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
