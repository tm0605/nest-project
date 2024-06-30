import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AddressService } from 'src/address/address.service';
import { RegisterDto, SignInResponseDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private addressService: AddressService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findUser(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async register(registerUserDto: RegisterDto) {
    const existingUser = await this.usersService.findUser(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException();
    }

    const { address: addressData, ...userData } = registerUserDto;
    const address = await this.addressService.createAddress(addressData);

    const createUserDto: CreateUserDto = {
      ...userData,
      addressId: address.id,
    };
    const user = await this.usersService.createUser(createUserDto);
    const payload = { sub: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
