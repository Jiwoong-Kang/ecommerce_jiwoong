import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { Provider } from '../../common/enums/provider.enum';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.NAVER,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('NAVER_AUTH_CLIENT_ID'),
      secret: configService.get('NAVER_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { provider, displayName, email, profile_image } = profile;
    console.log('provider', provider);
    console.log('displayName', displayName);
    console.log('email', email);
    console.log('profile', profile_image);

    try {
      const user = await this.userService.getUserByEmail(email);
      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      console.log('+++++++++++++++++++++++++++');
      done(null, user);
    } catch (err) {
      if (err.status === 404) {
        const newUser = await this.userService.createUser({
          name: displayName,
          email,
          provider,
          profileImg: profile_image,
        });
        console.log('------');
        done(null, newUser);
      }
    }
  }
}
