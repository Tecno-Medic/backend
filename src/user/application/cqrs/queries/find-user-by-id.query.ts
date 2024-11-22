import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { LoggingService } from '@shared/application/services/loggin.service';

export class FindUserByIdQuery {
  constructor(readonly id: number) {}
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler
  implements IQueryHandler<FindUserByIdQuery>
{
  constructor(
    private readonly loggingService: LoggingService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: FindUserByIdQuery): Promise<any> {
    const { id } = query;
    this.loggingService.log(`${this.constructor.name}.execute: id=${id}`);
    const user = await this.userRepository.findById(id);
    return {
      user,
      //traceId: this.loggingService.getTraceId(),
    };
  }
}
