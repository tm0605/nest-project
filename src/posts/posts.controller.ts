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
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto/post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LikesService } from 'src/likes/likes.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
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

  @Post('user/:userId')
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({
    type: PostResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto, // TODO: Remove userId param
  ) {
    return this.postsService.createPost({
      ...createPostDto,
      user: { connect: { id: userId } },
    });
  }

  @Post(':id/user/:userId/like')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async like(@Param('id') id: string, @Param('userId') userId: string) {
    return this.likesService.like({
      postWhere: { id },
      userWhere: { id: userId },
    });
  }

  @Put(':id')
  @ApiBody({ type: UpdatePostDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost({ where: { id }, data: updatePostDto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postsService.deletePost({ id });
  }

  @Delete(':id/user/:userId/like')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async unlike(@Param('id') id: string, @Param('userId') userId: string) {
    return this.likesService.removeLike({
      postWhere: { id },
      userWhere: { id: userId },
    });
  }
}
