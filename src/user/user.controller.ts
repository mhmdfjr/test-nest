import { Body, Controller, Get, Param, Post, Query, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  @Get() // GET /user
  getUser(@Query('name') name: string) {
    const users = [
      { id: '1', name: 'John', adress: 'USA' },
      { id: '2', name: 'Maria', adress: 'USA' },
      { id: '3', name: 'Smith', adress: 'USA' },
    ];

    if (name) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return users;
  }

  @Get(':id') // GET /user/:id
  getUserById(@Param('id') id: string) {
    return { id: 1, name: 'Ken', address: 'USA' };
  }

  @Post() // POST /user
  createUser(@Body() createUserDto: CreateUserDto) {
    return { data: createUserDto, message: 'User created successfully!' };
  }

  @Put(':id') // PUT /user/:id
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      data: { id, ...updateUserDto },
      message: 'User updated successfully',
    };
  }
}
