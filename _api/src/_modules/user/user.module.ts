import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { IUSER_REPOSITORY } from './interfaces/IUserRepository';


@Module({
  controllers: [UserController],
  providers: [
    {
      provide: IUSER_REPOSITORY,
      useClass: UserRepository
    },
    UserService
  ],
  exports: [
    UserService,
    IUSER_REPOSITORY
  ]
})
export class UserModule {}
