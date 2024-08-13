import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';

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
}
