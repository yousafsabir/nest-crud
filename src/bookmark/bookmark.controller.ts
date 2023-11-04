import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { BookmarkService } from 'bookmark/bookmark.service';
import { CreateBookmarkDTO } from 'bookmark/dto';
import { JwtGuard } from 'auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@Body() dto: CreateBookmarkDTO) {
    return this.bookmarkService.createBookmark(dto);
  }
}
