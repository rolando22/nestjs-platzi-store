import { User } from 'src/users/entities/user.entity';

export interface Token {
  role: User['role'];
  sub: User['id'];
}
