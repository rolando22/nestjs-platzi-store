import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { Token } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: User['email'],
    password: User['password'],
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  generateJWT(user: User) {
    const payload: Token = { role: user.role, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
