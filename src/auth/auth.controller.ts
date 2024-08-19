import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { EmailDto } from '../user/dto/email.dto';
import { ChangePasswordDto } from '../user/dto/change-password.dto';
import { UserService } from '../user/user.service';
import { EmailVerificationDto } from '../user/dto/email-verification.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { NaverAuthGuard } from './guards/naver-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 회원가입
  @Post('/signup')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.signupUser(createUserDto);
    await this.authService.signupWelcomeEmail(createUserDto.email);
    return newUser;
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

  @ApiBearerAuth()
  //스웨거 상에서 헤더에 토큰이 있단 걸 알려줘서 프로그램이 알아듣게 함
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
    return await this.userService.changePasswordWithToken(changePasswordDto);
  }

  @Post('/send/email')
  async sendEmail(@Body() emailDto: EmailDto) {
    return await this.authService.initiateEmailAddressVerification(
      emailDto.email,
    );
  }

  @Post('/check/email')
  async checkEmail(@Body() emailVerificationDto: EmailVerificationDto) {
    return await this.authService.confirmEmailVerification(
      emailVerificationDto,
    );
  }

  @HttpCode(200)
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return HttpStatus.OK;
  }

  @HttpCode(200)
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: RequestWithUser) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req: RequestWithUser) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin() {
    return HttpStatus.OK;
  }

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverLoginCallback(@Req() req: RequestWithUser) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
}
