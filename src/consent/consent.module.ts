import { Module } from '@nestjs/common';
import { ConsentController } from '@consent/consent.controller';
import { ConsentService } from '@consent/consent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from '@consent/entities/consent.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consent]), UserModule],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConsentModule {}
