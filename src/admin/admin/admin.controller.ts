import { Controller, Get, Inject, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service.js';

@Controller('/api/admin')
export class AdminController {
  //   @Inject()
  //   private adminService: AdminService; // property injection
  constructor(private readonly adminService: AdminService) {} // constructor injection

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
