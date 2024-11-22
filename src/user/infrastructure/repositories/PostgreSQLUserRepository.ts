import { DRIZZLE } from '@db/drizzle.module';
import { users } from '@db/schema/schema';
import { DrizzleDB } from '@db/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@user/domain/entities/User';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { eq } from 'drizzle-orm';
import { LoggingService } from '@shared/application/services/loggin.service';

@Injectable()
export class PostgreSQLUserRepository implements UserRepository {
  constructor(
    private readonly loggingService: LoggingService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {}

  async create(user: User): Promise<any> {
    return this.db
      .insert(users)
      .values({ ...user })
      .returning();
  }

  async findById(id: number): Promise<any> {
    this.loggingService.log(`${this.constructor.name}.findById: id=${id}`);
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.db.query.users.findMany({
      columns: {
        password: false,
      },
    });
  }
}
