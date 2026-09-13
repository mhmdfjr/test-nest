import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'Maria', email: 'maria@test.app' },
    { id: 2, name: 'John', email: 'john@test.app' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('Finding all users');

    return this.users.filter((user) =>
      user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    );
  }

  findOneUser(id: number) {
    this.logger.log(`Finding user with id: ${id}`);

    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user`);

    const newUser: User = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user with id: ${id}`);

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    const [deleted] = this.users.splice(userIndex, 1);

    return deleted;
  }
}
