import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from '@common/enums/role.enum';
import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { PageDto } from '@common/dtos/page.dto';
import { UserService } from '@user/user.service';
import RoleGuard from '@auth/guards/role.guard';
import { User } from '@user/entities/user.entity';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RequestWithUser } from '@auth/interfaces/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '@root/minio-client/file.model';
import { CreateUserDto } from '@user/dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard(Role.ADMIN))
  @Get('/all')
  async getAllUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.getAllUsers(pageOptionsDto);
  }

  // 관리자가 아이디로 유저를 찾을 경우
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  //수정할 떄
  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
  @ApiBody({
    description: 'A single image file with additional user data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Profile image file',
        },

        name: {
          type: 'string',
          description: 'Name of the user',
          example: 'Jiwoong',
        },

        email: {
          type: 'string',
          description: 'Email address of the user',
          example: 'dnd0311@naver.com',
        },

        password: {
          type: 'string',
          description: 'Password of the user',
          example: 'password123@',
        },
      },
    },
  })
  async updateUserByToken(
    @Req() req: RequestWithUser,
    @UploadedFile() profileImg?: BufferedFile,
    @Body() updateUserDto?: CreateUserDto,
  ) {
    return await this.userService.updateUserInfoByToken(
      req.user,
      profileImg,
      updateUserDto,
    );
  }
}
