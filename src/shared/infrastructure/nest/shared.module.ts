import { Global, Module } from '@nestjs/common';
import { LoggingService } from '@shared/application/services/loggin.service';

@Global()
@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class SharedModule {}
