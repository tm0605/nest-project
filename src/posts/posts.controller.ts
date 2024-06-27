import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, PostDto, UpdatePostDto } from './dto/post.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAllPost();
  }

  @Get('user/:userId')
  async findUserPost(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findUserPost({ userId });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findUniquePost({ id });
  }

  @Post('user/:userId')
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({
    type: PostDto,
  })
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost({
      ...createPostDto,
      user: { connect: { id: userId } },
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost({ where: { id }, data: updatePostDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost({ id });
  }
}
