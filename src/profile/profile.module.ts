import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@profile/entities/profile.entity';
import { ProfileController } from '@profile/profile.controller';
import { ProfileService } from '@profile/profile.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
