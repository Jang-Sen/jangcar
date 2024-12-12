import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome Jang Car';
  }

  @Cron('45 * * * * *')
  testSchedule() {
    return console.log('매 분 45초에 찍히기');
  }
}
