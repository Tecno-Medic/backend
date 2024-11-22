import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '@user/application/cqrs/queries/find-user-by-id.query';
import { LoggingService } from '@shared/application/services/loggin.service';

@Controller('users')
export class FindUserByIdController {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('find')
  async findById(@Query('id') id: number) {
    this.loggingService.log(`${this.constructor.name}.findById: id=${id}`);
    const query = new FindUserByIdQuery(id);
    return await this.queryBus.execute(query);
  }
}
