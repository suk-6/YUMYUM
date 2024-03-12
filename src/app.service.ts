import { Injectable } from '@nestjs/common';
import { NeisService } from './neis/neis.service';

@Injectable()
export class AppService {
    public constructor(private readonly neisService: NeisService) {}
}
