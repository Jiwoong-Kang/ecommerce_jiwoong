import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { EmailModule } from '@email/email.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { AccessTokenStrategy } from '@auth/strategies/access-token.strategy';
import { LocalAuthStrategy } from '@auth/strategies/local-auth.strategy';
import { GoogleAuthStrategy } from '@auth/strategies/google-auth.strategy';
import { KakaoAuthStrategy } from '@auth/strategies/kakao-auth.strategy';
import { NaverAuthStrategy } from '@auth/strategies/naver-auth.strategy';
import { RefreshTokenStrategy } from '@auth/strategies/refresh-token.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), ConfigModule, EmailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    AccessTokenStrategy,
    GoogleAuthStrategy,
    KakaoAuthStrategy,
    NaverAuthStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
