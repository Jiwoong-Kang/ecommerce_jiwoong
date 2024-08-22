import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@common/enums/role.enum';
import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { PageDto } from '@common/dtos/page.dto';
import { UserService } from '@user/user.service';
import RoleGuard from '@auth/guards/role.guard';
import { User } from '@user/entities/user.entity';

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
