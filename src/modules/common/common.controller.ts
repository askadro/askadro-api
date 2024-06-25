import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/users/quards/jwt-auth-guard';
import { RolesGuard } from '@/modules/users/quards/roles.guard';
import { CommonService } from '@/modules/common/common.service';
import { Roles } from '@/modules/users/roles.decorator';
import { ROLES } from '@/constants/enums/roles';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Roles(ROLES.manager)
  @Get("summary")
  homepageSummary(){
    // return this.commonService.homepageSummary()
  }
}