import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/user/application/cqrs/commands/create-user.command';

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createUserDto: any) {
    console.log('createUserDto', createUserDto);
    const command = new CreateUserCommand(createUserDto);
    await this.commandBus.execute(command);
  }
}
