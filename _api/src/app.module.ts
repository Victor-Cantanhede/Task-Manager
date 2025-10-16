import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './_modules/user/user.module';


@Module({
  imports: [DbModule, UserModule]
})
export class AppModule {}
