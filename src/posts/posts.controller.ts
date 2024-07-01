import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LikesService } from 'src/likes/likes.service';
import PostCreateDto from './dto/create.dto';
import PostUpdateDto from './dto/update.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.postsService.findAllPost();
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findUserPost(@Param('userId') userId: string) {
    return this.postsService.findUserPost({ userId });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.postsService.findUniquePost({ id });
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Param('userId') userId: string,
    @Body() createPostDto: PostCreateDto, // TODO: Remove userId param
  ) {
    return this.postsService.create({
      ...createPostDto,
      user: { connect: { id: userId } },
    });
  }

  // @Post(':id/user/:userId/like')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async like(@Param('id') id: string, @Param('userId') userId: string) {
  //   return this.likesService.like({
  //     postWhere: { id },
  //     userWhere: { id: userId },
  //   });
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: PostUpdateDto) {
    return this.postsService.update({ where: { id }, data: updatePostDto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postsService.delete({ id });
  }

  // @Delete(':id/user/:userId/like')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async unlike(@Param('id') id: string, @Param('userId') userId: string) {
  //   return this.likesService.removeLike({
  //     postWhere: { id },
  //     userWhere: { id: userId },
  //   });
  // }
}
