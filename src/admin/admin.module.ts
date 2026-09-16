import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller.js';
import { AdminService } from './admin/admin.service.js';
import {
  Connection,
  createConnection,
  MongoConnection,
  MySQLConnection,
} from './connection/connection.js';
import { mailService, MailService } from './mail/mail.service.js';
import { createRepository, Repository } from './repository/repository.js';
import { MemberService } from './member/member.service.js';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService, // Standard Provider
    // {
    //   provide: Connection, // Class Provider
    //   useClass:
    //     process.env.DATABASE == 'mysql' ? MySQLConnection : MongoConnection,
    // },
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService, // Value Provider
      useValue: mailService,
    },
    {
      provide: 'EmailService', // Alias Provider
      useExisting: MailService,
    },
    {
      provide: Repository, // Factory Provider
      useFactory: createRepository,
      inject: [Connection],
    },
    MemberService,
  ],
})
export class AdminModule {}
