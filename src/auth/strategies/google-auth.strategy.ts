import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Provider } from '../../common/enums/provider.enum';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.GOOGLE,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    //name, email, provider

    const { provider, displayName, email, picture } = profile;
    try {
      // 이메일 유무 체크
      const user = await this.userService.getUserByEmail(email);

      // 기존 가입된 정보가 있다면 provider로 체크해줌으로써 니가 어디에 가입했었지를 체크해준다(google이나 kakao같은 걸로 됐는지를 본다)
      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      done(null, user);
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        // 유저정보가 없다는 뜻이니 회원가입이 우선된다.
        const newUser = await this.userService.createUser({
          name: displayName,
          email,
          provider,
          profileImg: picture,
        });
        done(null, newUser);
      } else if (err.status === 409) {
        throw new HttpException(
          'Your email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}
