import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );
  //이메일 확인용
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  //비밀번호를 가려줌
  const port = configService.get('SERVER_PORT') ?? 7000;
  await app.listen(port);
}
bootstrap();
