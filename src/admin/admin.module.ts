import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller.js';

@Module({
  controllers: [AdminController]
})
export class AdminModule {}
