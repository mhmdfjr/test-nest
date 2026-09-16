import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  sayHello(name: string): string {
    return `Hello ${name}`;
  }
}
