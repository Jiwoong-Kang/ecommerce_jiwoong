import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { UserService } from '@user/user.service';
//jwt자체를 검증하는 단계이다

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 토큰 위치를 헤드에 놓겠다. 베어러토큰방식이다
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    return await this.userService.getUserById(payload.userId);
  }
}
