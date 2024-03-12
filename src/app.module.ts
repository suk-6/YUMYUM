import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NeisService } from './neis/neis.service';
import { NeisController } from './neis/neis.controller';
import { NeisModule } from './neis/neis.module';
import { KakaoService } from './kakao/kakao.service';
import { KakaoModule } from './kakao/kakao.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [NeisModule, KakaoModule, HttpModule],
    controllers: [NeisController],
    providers: [AppService, NeisService, KakaoService],
})
export class AppModule {}
