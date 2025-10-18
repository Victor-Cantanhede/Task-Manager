import { Module } from '@nestjs/common';
import { DbModule } from './_db/db.module';
import { UserModule } from './_modules/user/user.module';
import { AuthModule } from './_modules/auth/auth.module';
import { TaskModule } from './_modules/task/task.module';


@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    TaskModule
  ]
})
export class AppModule {}
