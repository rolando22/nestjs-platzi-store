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

import { OrderItemsService } from 'src/users/services/order-items/order-items.service';
import {
  CreateOrderItemDto,
  OrderItemQueryDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  async getAll(@Query() query: OrderItemQueryDto) {
    const orderItems = await this.orderItemsService.findAll(query);

    return {
      data: orderItems,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a order item by ID' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const orderItem = await this.orderItemsService.findOne(id);

    return {
      data: orderItem,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  async create(@Body() body: CreateOrderItemDto) {
    const newOrderItem = await this.orderItemsService.create(body);

    return {
      message: 'Order item created successfully',
      data: newOrderItem,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order item' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderItemDto,
  ) {
    const orderItem = await this.orderItemsService.update(id, body);

    return {
      message: 'Order item updated successfully',
      data: orderItem,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a order item by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const orderItem = await this.orderItemsService.delete(id);

    return {
      message: 'Order item deleted successfully',
      data: orderItem,
    };
  }
}
