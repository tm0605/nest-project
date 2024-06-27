import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule, ConfigModule.forRoot()],
  // providers: [UsersService, PostsService, CommentsService, CategoriesService],
  // controllers: [UsersController, PostsController, CommentsController, CategoriesController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    consumer.apply(logger).forRoutes(UsersModule);
  }
}
