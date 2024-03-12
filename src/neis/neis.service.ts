import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class NeisService {
    constructor(private readonly httpService: HttpService) {}

    public getDietInfo() {
        this.httpService.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531328&MLSV_YMD=20240312`)
    }
}