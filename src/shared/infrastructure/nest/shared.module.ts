import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

@Global()
@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class SharedModule {}
