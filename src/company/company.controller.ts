import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateAuthorizedDto } from './dtos/create-authorized.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/new')
  async createCompany(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }

  @Post('/new-authorized')
  async createAuthorized(@Body() body: CreateAuthorizedDto[]) {
    return await this.companyService.createAuthorized(body);
  }

  @Get('/all')
  async getCompanies() {
    return await this.companyService.find();
  }

  @Get('/:id')
  async getCompany(@Param('id') id: string) {
    return await this.companyService.findOne(id, { authorized: true });
  }

  @Patch('/update/:id')
  async updateCompany(@Body() body: UpdateCompanyDto, @Param('id') id: string) {
    return await this.companyService.update(id, body);
  }

  @Delete('/delete/:id')
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }
}
