import { Module } from '@nestjs/common';
import { DbModule } from './_db/db.module';
import { UserModule } from './_modules/user/user.module';
import { AuthModule } from './_modules/auth/auth.module';


@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
