import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ITASK_REPOSITORY } from './interfaces/ITaskRepository';
import { TaskRepository } from './repositories/task.repository';


@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: ITASK_REPOSITORY,
      useClass: TaskRepository
    },
    TaskService
  ]
})
export class TaskModule {}
