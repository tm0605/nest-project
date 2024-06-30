import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostResponseDto } from './dto/post.dto';
import { CommentsService } from 'src/comments/comments.service';
import { LikesService } from 'src/likes/likes.service';

@Injectable()
export class PostsService {
  constructor(
    private commentsService: CommentsService,
    private likesService: LikesService,
    private prisma: PrismaService,
  ) {}

  async findAllPost(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findUniquePost(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUniqueOrThrow({ where });
    const comment = await this.commentsService.find({ postId: post.id });
    const likes = await this.likesService.find({ id: post.id });
    return { ...post, comments: comment.length, likes: likes.length };
  }

  async findUserPost(where: Prisma.PostWhereInput): Promise<Post[] | null> {
    return await this.prisma.post.findMany({ where });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({ data });
    const comment = await this.commentsService.find({ postId: post.id });
    const likes = await this.likesService.find({ id: post.id });
    return { ...post, comments: comment.length, likes: likes.length };
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<PostResponseDto> {
    const { where, data } = params;
    const post = await this.prisma.post.update({ data, where });
    const comment = await this.commentsService.find({ postId: post.id });
    const likes = await this.likesService.find({ id: post.id });
    return { ...post, comments: comment.length, likes: likes.length };
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({ where });
  }
}
