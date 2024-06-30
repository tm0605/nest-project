import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async find(where: Prisma.CommentWhereInput): Promise<Comment[]> {
    return await this.prisma.comment.findMany({ where });
  }

  async findOne(
    where: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment | null> {
    return await this.prisma.comment.findUnique({ where });
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return await this.prisma.comment.create({ data });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return await this.prisma.comment.update({ data, where });
  }

  async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return await this.prisma.comment.delete({ where });
  }
}
