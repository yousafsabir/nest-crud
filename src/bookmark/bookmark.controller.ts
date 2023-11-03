import { Controller, Post, Body } from '@nestjs/common';

import { BookmarkService } from 'bookmark/bookmark.service';
import { CreateBookmarkDTO } from 'bookmark/dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@Body() dto: CreateBookmarkDTO) {
    return this.bookmarkService.createBookmark(dto);
  }
}
