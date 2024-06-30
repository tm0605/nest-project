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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get('post/:postId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async find(@Param('postId') postId: string) {
    return this.commentService.find({ postId });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findComment(@Param('id') id: string) {
    return await this.commentService.findOne({ id });
  }

  @Post('post/:postId/user/:userId')
  @ApiBody({ type: CreateCommentDto })
  // @ApiCreatedResponse({})
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.createComment({
      ...createCommentDto,
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    });
  }

  @Put(':id')
  @ApiBody({ type: UpdateCommentDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment({
      where: { id },
      data: updateCommentDto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.commentService.deleteComment({ id });
  }
}
