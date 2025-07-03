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

import { CustomersService } from 'src/users/services/customers/customers.service';
import {
  CreateCustomerDto,
  CustomerQueryDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  async getAll(@Query() query: CustomerQueryDto) {
    const customers = await this.customersService.findAll(query);

    return {
      data: customers,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.findOne(id);

    return {
      data: customer,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  async create(@Body() body: CreateCustomerDto) {
    const newCustomer = await this.customersService.create(body);

    return {
      message: 'Customer created successfully',
      data: newCustomer,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(id, body);

    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.delete(id);

    return {
      message: 'Customer deleted successfully',
      data: customer,
    };
  }
}
