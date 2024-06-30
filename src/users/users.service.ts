import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUniqueUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) throw new HttpException('no user found', 204);
    return user;
  }

  async findUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new HttpException('no user found', 204);
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    return this.prisma.user.create({ data: userData });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput & { address?: Prisma.AddressUpdateInput };
  }): Promise<User> {
    const { where, data } = params;
    const { address, ...userData } = data;

    if (data.password) {
      userData.password = await bcrypt.hash(userData.password as string, 10);
    }

    if (address) {
      const user = await this.findUniqueUser(where);
      await this.prisma.address.update({
        where: { id: user?.addressId },
        data: address,
      });
    }
    return this.prisma.user.update({ data: userData, where });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
