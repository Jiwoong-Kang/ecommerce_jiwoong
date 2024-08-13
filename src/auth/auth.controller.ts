import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { EmailDto } from '../user/dto/email.dto';
import { ChangePasswordDto } from '../user/dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.signupUser(createUserDto);
    return await this.authService.signupWelcomeEmail(createUserDto.email);
  }
  //browser 안에서 사용자가 입력하는 것은 body이고 url에서 입력할 변수명은 param을 사용한다.

  // 로그인
  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req: RequestWithUser) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   const user = await this.authService.loginUser(loginUserDto);
  //   const token = await this.authService.generateAccessToken(user.id);
  //   return { user, token };
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() req: RequestWithUser) {
    return await req.user;
  }

  @Post('/find/password')
  async findPassword(@Body() emailDto: EmailDto) {
    return await this.authService.findPasswordSendEmail(emailDto.email);
  }

  @Put('/change/password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return '';
  }
}
