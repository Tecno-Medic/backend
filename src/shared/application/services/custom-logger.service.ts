import { Injectable, Logger } from '@nestjs/common';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable()
export class CustomLoggerService extends Logger {
  constructor(
    private readonly asyncContextService: AsyncContextService,
    context?: string,
  ) {
    super(context);
  }

  private getTraceId(): string {
    return this.asyncContextService.get('traceId') || 'no-trace';
  }

  private formatMessage(message: any): string {
    const traceId = this.getTraceId();
    return `[${traceId}] ${message}`;
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(this.formatMessage(message), ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(this.formatMessage(message), ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(this.formatMessage(message), ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(this.formatMessage(message), ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(this.formatMessage(message), ...optionalParams);
  }

  // setContext(context: string) {
  //   super.setContext(context);
  // }
}
