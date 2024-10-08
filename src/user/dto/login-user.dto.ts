import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ example: 'dnd0311@naver.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ example: 'password123@' })
  password: string;
}
