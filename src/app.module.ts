import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '@user/infrastructure/nestjs/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './healthcheck.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@db/drizzle.module';
import { ProductModule } from './product/product.module';
import { TraceIdMiddleware } from '@shared/infrastructure/middlewares/trace-id.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncContextService } from '@shared/application/services/async-context-service';
import { AsyncContextInterceptor } from '@shared/infrastructure/interceptors/async-context.interceptor';
import { AsyncContextModule } from '@shared/infrastructure/nest/async-context.module';
import { SharedModule } from '@shared/infrastructure/nest/shared.module';

@Module({
  imports: [
    AsyncContextModule,
    HttpModule,
    TerminusModule,
    SharedModule,
    UserModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
  ],
  controllers: [HealthcheckController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncContextInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
