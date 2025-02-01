import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { Resource, Roles } from 'nest-keycloak-connect';
import { Province } from '@/modules/provinces/entities/province.entity';

@Resource(Province.name)
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Roles({ roles: ['owner'] })
  @Post("/create")
  async createProvinces() {
    return this.provincesService.create();
  }

  @Get()
  async findAllProvinces() {
    return this.provincesService.findAllProvinces();
  }

  @Get('districts')
  async findAllDistricts() {
    return this.provincesService.findAllDistricts();
  }

  @Get(':id/district')
  async findDistrictsByProvince(@Param('id') id: string) {
    return this.provincesService.findDistrictsByProvince(id);
  }
}
