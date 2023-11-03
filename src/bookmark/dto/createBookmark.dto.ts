import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateBookmarkDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
