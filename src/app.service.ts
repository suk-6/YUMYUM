import { Injectable } from '@nestjs/common';
import { NeisService } from './neis/neis.service';
import { KakaoService } from './kakao/kakao.service';

const schedule = require('node-schedule');

@Injectable()
export class AppService {
    public constructor(
        private readonly neisService: NeisService,
        private readonly kakaoService: KakaoService,
    ) {
        this.setSchedule();
    }

    public async sendTodayDiet() {
        const todayDiet = await this.neisService.getTodayDiet();
        if (todayDiet.status)
            await this.kakaoService.sendBlockMessage(todayDiet);
    }

    public async setSchedule() {
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [new schedule.Range(1, 5)];
        rule.hour = 9;
        rule.minute = 0;

        schedule.scheduleJob(rule, () => {
            this.sendTodayDiet();
        });
    }
}
