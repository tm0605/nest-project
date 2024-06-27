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
import { CreatePostDto, PostDto, UpdatePostDto } from './dto/post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
    type: PostDto,
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
}
