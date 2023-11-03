import {
  createParamDecorator,
  ExecutionContext,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { DbService } from 'db.service';
import { UserService } from 'user/user.service';

type UserDataRequirement = 'getUser' | 'getUserId';

@Injectable()
class ParseTokenPipe implements PipeTransform {
  constructor(private db: DbService, private userService: UserService) {}

  async transform(userId: number | undefined, metadata: ArgumentMetadata) {
    if (!userId) return;
    const requirement = metadata.data as UserDataRequirement;
    if (requirement === 'getUser') {
      return await this.userService.getUser(userId);
    } else if (requirement === 'getUserId') {
      return userId;
    }
  }
}

const ReturnUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
export const User = (dataType: UserDataRequirement = 'getUserId') =>
  ReturnUserId(dataType, ParseTokenPipe);
