import { Module, forwardRef } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { LikeController } from './likes.controller';

@Module({
  imports: [UsersModule, PostsModule],
  providers: [LikesService, PrismaService],
  controllers: [LikeController]
})
export class LikesModule {}
