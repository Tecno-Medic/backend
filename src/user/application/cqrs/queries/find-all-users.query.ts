import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { LoggingService } from '@shared/application/services/loggin.service';

export class FindAllUsersQuery {}

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersQueryHandler
  implements IQueryHandler<FindAllUsersQuery>
{
  constructor(
    private readonly loggingService: LoggingService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<any> {
    return await this.userRepository.findAll();
  }
}
