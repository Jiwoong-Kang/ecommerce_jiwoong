import { Controller, Get } from '@nestjs/common';
import { AppService } from '@root/app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @HealthCheck()
  async getAPIServerHealthCheck(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      // database 모듈에 핑을 날린다
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // 300 메가 이상으로 RSS 메모리가 올라가지 않게 해준다.
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      // 50퍼센트 이상의 저장공간이 되지 못하게 한다.
      () =>
        this.diskHealthIndicator.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
    ]);
  }
}
