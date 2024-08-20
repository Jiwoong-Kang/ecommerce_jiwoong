import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@common/enums/provider.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Jiwoong' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'dnd0311@naver.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @MinLength(7)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  @ApiProperty({ example: 'password123@' })
  password?: string;
  //소셜로그인을 위해서

  @IsString()
  profileImg?: string;

  @IsString()
  provider?: Provider;
}
