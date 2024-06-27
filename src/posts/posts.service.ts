import { HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAllPost(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findUniquePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.findUniqueOrThrow({ where });
  }

  async findUserPost(where: Prisma.PostWhereInput): Promise<Post[] | null> {
    return await this.prisma.post.findMany({ where });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return await this.prisma.post.update({ data, where });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({ where });
  }
}
