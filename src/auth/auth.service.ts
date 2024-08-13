import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { PostgresErrorCodes } from '../database/postgresErrorCodes.enum';
import { EmailService } from '../email/email.service';
import welcomeSignupEmail from '../common/template/welcomeSignup';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    // return await this.userService.createUser(createUserDto);
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      if (error?.code === PostgresErrorCodes.unique_violation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else if (error?.code === PostgresErrorCodes.not_null_violation) {
        throw new HttpException(
          'please check not null body value',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  async signupWelcomeEmail(email: string) {
    await this.emailService.sendMail({
      to: email,
      subject: 'Welcome to Jiwoong world',
      html: welcomeSignupEmail(email),
    });
    return 'Please check your email';
  }

  async findPasswordSendEmail(email: string) {
    const payload: any = { email };
    const user = await this.userService.getUserByEmail(email);
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('FIND_PASSWORD_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('FIND_PASSWORD_EXPIRATION_TIME')}`,
    });
    const url = `${this.configService.get('EMAIL_BASE_URL')}/change/password?token=${token}`;
    await this.emailService.sendMail({
      to: email,
      subject: 'Jiwoong World Password 변경',
      text: `비밀번호 찾기 ${url}`,
    });
    return 'Please check your email';
  }
}
