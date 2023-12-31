import {
  createParamDecorator,
  ExecutionContext,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { DbService } from 'db.service';
import { User as UserModel } from '@prisma/client';

type UserDataRequirement = 'user' | keyof UserModel;

@Injectable()
class ParseTokenPipe implements PipeTransform {
  constructor(private db: DbService) {}

  async transform(userId: number | undefined, metadata: ArgumentMetadata) {
    if (!userId) return;
    const requirement = metadata.data as UserDataRequirement;
    if (requirement === 'id') return userId;
    const user = await this.db.user.findUnique({ where: { id: userId } });
    return requirement === 'user' ? user : user[requirement];
  }
}

const ReturnUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
export const User = (dataType: UserDataRequirement = 'id') =>
  ReturnUserId(dataType, ParseTokenPipe);
