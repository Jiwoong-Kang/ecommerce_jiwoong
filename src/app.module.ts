import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@user/user.module';
import { ProductModule } from '@product/product.module';
import { AuthModule } from '@auth/auth.module';
import { OrderModule } from '@order/order.module';
import { EmailModule } from '@email/email.module';
import { RedisModule } from '@redis/redis.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { ConsentModule } from './consent/consent.module';
import { ProfileModule } from './profile/profile.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@config/appConfig.module';

@Module({
  imports: [
    AppConfigModule,
    TerminusModule,
    DatabaseModule,
    UserModule,
    ProductModule,
    OrderModule,
    AuthModule,
    EmailModule,
    RedisModule,
    ConsentModule,
    ProfileModule,
    MinioClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
