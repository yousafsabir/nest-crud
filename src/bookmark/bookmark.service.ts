import { Injectable } from '@nestjs/common';

import { DbService } from 'db.service';
import { CreateBookmarkDTO } from 'bookmark/dto';

@Injectable()
export class BookmarkService {
  constructor(private db: DbService) {}

  async createBookmark(dto: CreateBookmarkDTO) {
    return await this.db.bookmark.create({
      data: { ...dto },
    });
  }
}
