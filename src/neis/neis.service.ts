import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { dietResult } from './neis.model';

@Injectable()
export class NeisService {
    constructor(private readonly httpService: HttpService) {}

    public async getDietInfo(today: string) {
        const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531328&MLSV_YMD=${today}`;
        const pipe = this.httpService.get(url).pipe();
        const response = await lastValueFrom(pipe);

        return response.data;
    }

    public async getTodayDiet() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const today = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;

        try {
            const dietInfo = (await this.getDietInfo(today))
                .mealServiceDietInfo[1].row[0];

            const diet = dietInfo.DDISH_NM.split('<br/>').map((item: string) =>
                item.trim(),
            );
            const kcal = dietInfo.CAL_INFO;

            const result: dietResult = {
                status: true,
                title: `${month}월 ${day}일 급식`,
                diet,
                kcal,
            };

            return result;
        } catch (error) {
            console.error(error);
            return {
                status: false,
            };
        }
    }
}
