import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { IUSER_SERVICE } from '../user/interfaces/IUserService';


@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: IUSER_SERVICE,
      useClass: UserService
    },
    AuthService
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    UserModule
  ]
})
export class AuthModule {}
