import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RequestWithUser } from '@auth/interfaces/requestWithUser.interface';
import { CreateConsentDto } from '@consent/dto/create-consent.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Consent')
@Controller('consent')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // 헤더에 jwt로 로그인 유무체크(return user정보) 결국 유저정보를 가져오기 위한수단
  async createConsent(
    @Req() req: RequestWithUser,
    @Body() createConsentDto: CreateConsentDto,
  ) {
    return await this.consentService.createConsent(req.user, createConsentDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateConsentByUser(
    @Req() req: RequestWithUser,
    @Body() createConsentDto: CreateConsentDto,
  ) {
    return await this.consentService.updateConsentByUser(
      req.user,
      createConsentDto,
    );
  }
}
