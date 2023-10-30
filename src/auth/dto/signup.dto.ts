import { IsString, IsEmail, IsStrongPassword, IsNotEmpty, IsEmpty, IsOptional } from 'class-validator';

export class SignupDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
