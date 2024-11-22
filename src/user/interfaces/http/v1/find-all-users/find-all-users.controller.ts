import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllUsersQuery } from '@user/application/cqrs/queries/find-all-users.query';

@Controller('users')
export class FindAllUsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAll() {
    const query = new FindAllUsersQuery();
    return await this.queryBus.execute(query);
  }
}
