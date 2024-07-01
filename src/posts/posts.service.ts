import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostResponseDto } from './dto/response.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAllPost(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findUniquePost(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUniqueOrThrow({ where, include: PostResponseDto.include });
    return post;
  }

  async findUserPost(where: Prisma.PostWhereInput): Promise<Post[] | null> {
    return await this.prisma.post.findMany({ where });
  }

  async create(data: Prisma.PostCreateInput): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({ data, include: PostResponseDto.include });
    return post
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<PostResponseDto> {
    const { where, data } = params;
    const post = await this.prisma.post.update({ data, where, include: PostResponseDto.include });
    return post
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({ where });
  }
}
