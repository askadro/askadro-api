import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from '@/modules/common/common.service';


@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get("summary")
  homepageSummary(){
    // return this.commonService.homepageSummary()
  }
}