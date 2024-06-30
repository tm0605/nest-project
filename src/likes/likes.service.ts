import { Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { PostsService } from 'src/posts/posts.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikesService {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private prisma: PrismaService,
  ) {}

  async like(params: {
    postWhere: Prisma.PostWhereUniqueInput;
    userWhere: Prisma.UserWhereUniqueInput;
  }): Promise<Like> {
    const { postWhere, userWhere } = params;
    const user = await this.usersService.findUniqueUser(userWhere);
    const post = await this.postsService.findUniquePost(postWhere);

    return await this.prisma.like.create({
      data: { postId: post.id, userId: user.id },
    });
  }

  async find(where: Prisma.PostWhereUniqueInput): Promise<Like[]> {
    return await this.prisma.like.findMany({ where: { postId: where.id } });
  }

  async removeLike(params: {
    postWhere: Prisma.PostWhereUniqueInput;
    userWhere: Prisma.UserWhereUniqueInput;
  }): Promise<Like> {
    const { postWhere, userWhere } = params;
    const user = await this.usersService.findUniqueUser(userWhere);
    const post = await this.postsService.findUniquePost(postWhere);

    return await this.prisma.like.delete({
      where: { userId_postId: { userId: user.id, postId: post.id } },
    });
  }
}
