import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  address: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  address: string;
}
