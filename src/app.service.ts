import { Injectable } from '@nestjs/common';
import { NeisService } from './neis/neis.service';
import { KakaoService } from './kakao/kakao.service';

@Injectable()
export class AppService {
    public constructor(
        private readonly neisService: NeisService,
        private readonly kakaoService: KakaoService,
    ) {
        this.sendTodayDiet();
    }

    public async sendTodayDiet() {
        const todayDiet = await this.neisService.getTodayDiet();
        if (todayDiet.status)
            await this.kakaoService.sendBlockMessage(todayDiet);
    }
}
