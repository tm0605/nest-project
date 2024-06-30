import { Module, forwardRef } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => PostsModule)],
  providers: [LikesService, PrismaService],
  exports: [LikesService],
})
export class LikesModule {}
