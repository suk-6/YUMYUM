import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NeisService } from './neis.service';

@Module({
    imports: [HttpModule],
    providers: [NeisService],
})
export class NeisModule {}
