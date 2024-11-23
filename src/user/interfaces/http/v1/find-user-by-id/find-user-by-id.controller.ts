import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '@user/application/cqrs/queries/find-user-by-id.query';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

@Controller('users')
export class FindUserByIdController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    // this.customLoggerService.setContext(FindUserByIdController.name);
  }

  @Get('find')
  async findById(@Query('id') id: number) {
    this.customLoggerService.log(`${this.constructor.name}.findById: id=${id}`);
    const query = new FindUserByIdQuery(id);
    return await this.queryBus.execute(query);
  }
}
