import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  // 이메일 유무 체크 -> 패스워드 매칭 유무(with password decoding)
  async loginUser(loginUserDto: LoginUserDto) {
    // 이메일 유무 체크
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    // 패스워드 매칭 유무
    const isMatched = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isMatched) {
      throw new HttpException('Password do not match', HttpStatus.CONFLICT);
    }
    return user;
  }

  public generateAccessToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')}`,
    });
    return token;
  }
}
