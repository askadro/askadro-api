import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/new')
  createCompany(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @Get('/all')
  getCompanies() {
    return this.companyService.find();
  }

  @Get('/:id')
  getCompany(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post('/update/:id')
  updateCompany(@Body() body: Partial<Company>, @Param('id') id: string) {
    return this.companyService.update(id, body);
  }

  @Delete('/:id')
  deleteCompany(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
