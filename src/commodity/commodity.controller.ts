import { Body, Controller, Post } from '@nestjs/common';
import { CommodityService } from './commodity.service';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post('list')
  queryCommodityList(@Body() body: any) {
    return this.commodityService.queryCommodityList(body);
  }
}
