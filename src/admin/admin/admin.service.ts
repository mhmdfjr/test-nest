import { Injectable } from '@nestjs/common';

// Standard Provider
@Injectable()
export class AdminService {
  sayHello(name: string): string {
    return `Hello ${name}`;
  }
}
