import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UsersService } from 'src/users/services/users/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
} from 'src/users/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAll(@Query() query: UserQueryDto) {
    const users = await this.usersService.findAll(query);

    return {
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);

    return {
      data: user,
    };
  }

  // @Get(':id/orders')
  // @ApiOperation({ summary: 'Get orders by user' })
  // async getOrders(@Param('id', ParseIntPipe) id: number) {
  //   const orders = await this.usersService.getOrdersByUser(id);
  //   return {
  //     data: orders,
  //   };
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() body: CreateUserDto) {
    const newUser = await this.usersService.create(body);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, body);

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.delete(id);

    return {
      message: 'User deleted successfully',
      data: user,
    };
  }
}
