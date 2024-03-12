import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeisService } from './neis/neis.service';
import { NeisController } from './neis/neis.controller';
import { NeisModule } from './neis/neis.module';
import { KakaoService } from './kakao/kakao.service';
import { KakaoModule } from './kakao/kakao.module';

@Module({
    imports: [NeisModule, KakaoModule],
    controllers: [AppController, NeisController],
    providers: [AppService, NeisService, KakaoService],
})
export class AppModule {}
