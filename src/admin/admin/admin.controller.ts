import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/admin')
export class AdminController {
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie!');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request) {
    return request.cookies['name'];
  }
}
