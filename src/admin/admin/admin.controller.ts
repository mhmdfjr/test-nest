import { Controller, Get, Inject, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service.js';
import { Connection } from '../connection/connection.js';
import { MailService } from '../mail/mail.service.js';
import { Repository } from '../repository/repository.js';
import { MemberService } from '../member/member.service.js';

@Controller('/api/admin')
export class AdminController {
  //   @Inject()
  //   private adminService: AdminService; // property injection
  constructor(
    private adminService: AdminService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private repository: Repository,
    private memberService: MemberService,
  ) {} // constructor injection

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send();
    this.emailService.send();
    this.repository.save();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Get()
  async sayHello(): Promise<string> {
    return this.adminService.sayHello('Hasan');
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie!');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request) {
    return request.cookies['name'];
  }

  @Get('/view')
  getView(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }
}
