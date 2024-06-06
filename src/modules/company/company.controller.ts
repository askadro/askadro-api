import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { path } from '@/constants/paths';
import { CompanyCreate } from '@/decorators/company/create.decorator';
import { Bcrypt } from '@/utils/bcrypt';
import { UpdateAuthorizedDto } from '@/modules/company/dtos/update-authorized.dto';


@Controller(path.company.main)
export class CompanyController {
  constructor(private companyService: CompanyService) {
  }

  @Post(path.company.create)
  @UseInterceptors(CompanyCreate)
  async createCompany(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }



  // @Post(path.company.addAuthorized)
  // async createAuthorized(@Body() body: CreateAuthorizedDto) {
  //   return await this.companyService.createAuthorized(body);
  // }

  @Get(path.company.getCompanies)
  async getCompanies() {
    return await this.companyService.find();
  }

  @Get(path.company.getOneCompany)
  async getCompany(@Param('id') id: string) {
    return await this.companyService.findOne(id, { authorized: true,address:true });
  }

  @Patch(path.company.updateCompany)
  async updateCompany(@Body() body: UpdateCompanyDto, @Param('id') id: string) {
    return await this.companyService.update(id, body);
  }

  @Delete(path.company.deleteCompany)
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }

  ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Patch("/authorized/update/:id")
  updateAuthorized(@Param('id') id: string, @Body() authorized: UpdateAuthorizedDto) {
    return this.companyService.updateAuthorized(id,authorized)
  }
}
