import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { CommentsModule } from './comments/comments.module';
import { LikesService } from './likes/likes.service';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    ConfigModule.forRoot(),
    AddressModule,
    LikesModule,
  ],
  // providers: [LikesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UsersModule);
  }
}
