import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard) // TODO: any way to apply all?
  @ApiBearerAuth()
  async findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.usersService.findUniqueUser({ id });
  }

  //   @Post()
  //   create(@Body() createUserDto: CreateUserDto) {
  //     return this.usersService.createUser(createUserDto);
  //   }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ where: { id }, data: updateUserDto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser({ id });
  }
}
