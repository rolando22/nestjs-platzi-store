import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from 'src/products/services/products/products.service';
import { CustomersService } from '../customers/customers.service';
import { User } from 'src/users/entities/user.entity';
// import { Order } from 'src/users/entities/order.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
} from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  async findAll(filters?: UserQueryDto): Promise<User[]> {
    const { limit, offset } = filters!;

    const users = await this.usersRepository.find({
      relations: ['customer'],
      take: limit,
      skip: offset,
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async findByEmail(email: User['email']): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['customer'],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(data);

    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }

    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, changes);
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return user;
  }

  // async getOrdersByUser(userId: number): Promise<Order> {
  //   const user = await this.findOne(userId);
  //   const products = await this.productsService.findAll();

  //   return {
  //     date: new Date(),
  //     user: user,
  //     products,
  //   };
  // }
}
