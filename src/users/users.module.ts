import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';

import { CustomersController } from './controllers/customers/customers.controller';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';

import { CustomersService } from './services/customers/customers.service';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';

import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, OrderItem, Order, User]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemsService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
