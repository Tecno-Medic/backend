import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from 'src/user/application/cqrs/commands/create-user.command';
import { CreateUserController } from 'src/user/interfaces/http/v1/create-user/create-user.controller';
import { FindAllUsersQueryHandler } from '@user/application/cqrs/queries/find-all-users.query';
import { DrizzleModule } from '@db/drizzle.module';
import { FindAllUsersController } from '@user/interfaces/http/v1/find-all-users/find-all-users.controller';
import { PostgreSQLUserRepository } from '../repositories/PostgreSQLUserRepository';
import { FindUserByIdQueryHandler } from '@user/application/cqrs/queries/find-user-by-id.query';
import { FindUserByIdController } from '@user/interfaces/http/v1/find-user-by-id/find-user-by-id.controller';

const controllers = [
  CreateUserController,
  FindAllUsersController,
  FindUserByIdController,
];
const commandHandlers = [CreateUserCommandHandler];
const queryHandlers = [FindAllUsersQueryHandler, FindUserByIdQueryHandler];

const application = [...commandHandlers, ...queryHandlers];
const infrastructure = [PostgreSQLUserRepository];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class UserModule {}
