import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString, IsStrongPassword } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/address.dto';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @ApiProperty({ type: String })
  password: string;
}

export class SignInResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  access_token: string;

  @IsString()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
}

export class RegisterDto {
  @IsString()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ type: String })
  password: string;

  @IsObject()
  @ApiProperty({ type: CreateAddressDto })
  address: CreateAddressDto;
}
