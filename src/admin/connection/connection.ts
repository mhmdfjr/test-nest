import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Class Provider
export class Connection {
  getName(): string {
    return 'No Connect';
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'My SQL Connect';
  }
}

@Injectable()
export class MongoConnection extends Connection {
  getName(): string {
    return 'Mongo Connect';
  }
}

// Factory Method
export function createConnection(configService: ConfigService): Connection {
  if (configService.get('DATABASE') == 'mysql') {
    return new MySQLConnection();
  } else {
    return new MongoConnection();
  }
}
