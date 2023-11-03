import { Injectable } from '@nestjs/common';
import { DbService } from 'db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getUser(id: number) {
    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteUser(id: number) {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
