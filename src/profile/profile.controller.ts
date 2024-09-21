import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RequestWithUser } from '@auth/interfaces/requestWithUser.interface';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateProfileDto })
  @ApiBody({
    description: 'Create new profile',
    schema: {
      type: 'object',
      properties: {
        gender: {
          type: 'enum',
          description: 'Gender of a user',
          enum: ['male', 'female', 'minority'],
          example: 'minority',
        },

        age: {
          type: 'number',
          description: 'Age of the user',
          example: '25',
        },

        birthday: {
          type: 'date',
          description: 'Birthday of the user',
          example: '1999-03-11',
        },

        height: {
          type: 'number',
          description: 'Height of the user',
          example: '184',
        },

        addressOfHome: {
          type: 'string',
          description: 'Address of the user',
          example: 'Seoul',
        },

        bloodType: {
          type: 'enum',
          enum: ['a', 'b', 'o', 'ab'],
          description: 'BloodType of the user',
          example: 'a',
        },

        introduction: {
          type: 'string',
          description: 'Introduction of the user',
          example: 'hello',
        },
      },
    },
  })
  async createProfile(
    @Req() req: RequestWithUser,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    console.log(createProfileDto);
    return await this.profileService.createProfile(req.user, createProfileDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfileByUser(
    @Req() req: RequestWithUser,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.profileService.updateProfileByUser(
      req.user,
      createProfileDto,
    );
  }
}
