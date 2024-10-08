import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { EmailDto } from '@user/dto/email.dto';
import { ChangePasswordDto } from '@user/dto/change-password.dto';
import { EmailVerificationDto } from '@user/dto/email-verification.dto';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { RequestWithUser } from '@auth/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GoogleAuthGuard } from '@auth/guards/google-auth.guard';
import { KakaoAuthGuard } from '@auth/guards/kakao-auth.guard';
import { NaverAuthGuard } from '@auth/guards/naver-auth.guard';
import { Response } from 'express';
import { RefreshAuthGuard } from '@auth/guards/refresh-auth.guard';
import { User } from '@user/entities/user.entity';

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
    // await this.authService.signupWelcomeEmail(createUserDto.email);
    return newUser;
  }
  //browser 안에서 사용자가 입력하는 것은 body이고 url에서 입력할 변수명은 param을 사용한다.

  // 로그인
  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const { accessToken, accessCookie } =
      await this.authService.generateAccessToken(user.id);
    const { refreshToken, refreshCookie } =
      await this.authService.generateRefreshToken(user.id);

    await this.userService.setCurrentRefreshTokenToRedis(refreshToken, user.id);

    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    res.send({ user, accessToken, refreshToken });
    // user만 반환해줘도 충분하긴 함

    // 레디스에 유저정보를 저장하는 프로세스

    // return { user, token };
  }
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   const user = await this.authService.loginUser(loginUserDto);
  //   const token = await this.authService.generateAccessToken(user.id);
  //   return { user, token };
  // }

  @UseGuards(RefreshAuthGuard)
  @Get('/refresh')
  @ApiResponse({ status: 200, description: 'Refresh Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Refresh', description: 'Refresh Successfully' })
  async refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const { accessCookie } = await this.authService.generateAccessToken(
      user.id,
    );
    res.setHeader('Set-Cookie', [accessCookie]);
    res.send(user);
  }

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
