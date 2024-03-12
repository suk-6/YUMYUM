import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeisService } from './neis/neis.service';
import { NeisController } from './neis/neis.controller';
import { NeisModule } from './neis/neis.module';

@Module({
    imports: [NeisModule],
    controllers: [AppController, NeisController],
    providers: [AppService, NeisService],
})
export class AppModule {}
