import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  async createProfile(user: User, createProfileDto: CreateProfileDto) {
    const newProfile = await this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    await this.profileRepository.save(newProfile);
    return newProfile;
  }

  async updateProfileByUser(user: User, createProfileDto: CreateProfileDto) {
    const userInfo = await this.userService.getUserById(user.id);
    return await this.profileRepository.update(
      { id: userInfo.profile.id },
      createProfileDto,
    );
  }
}
