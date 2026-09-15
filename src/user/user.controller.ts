import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { RoleGuard } from '../guards/role.guard.js';

@Controller('user')
// @UseGuards(RoleGuard) // Global Route Guards
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user
  @UseGuards(RoleGuard) // Route Guards
  getUsers(@Query('name') name: string): unknown {
    return this.userService.findAllUsers(name);
  }

  @Get(':id') // GET /user/:id
  getUserById(@Param('id', ParseIntPipe) id: number): unknown {
    return this.userService.findOneUser(id);
  }

  @Post() // POST /user
  createUser(@Body() createUserDto: CreateUserDto): unknown {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id') // PUT /user/:id
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): unknown {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id') // DELETE /user/:id
  @UseGuards(RoleGuard)
  deleteUser(@Param('id') id: string): unknown {
    return this.userService.deleteUser(Number(id));
  }
}
