import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RoleGuard from '../auth/guards/role.guard';
import { User } from './entities/user.entity';
import { Role } from '@common/enums/role.enum';
import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { PageDto } from '@common/dtos/page.dto';

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
}
