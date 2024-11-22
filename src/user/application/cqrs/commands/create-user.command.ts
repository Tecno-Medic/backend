import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';

export class CreateUserCommand {
  constructor(readonly user: any) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userRepository.create(command.user);
  }
}
