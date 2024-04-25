import { Controller, Get, Post } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller("provinces")
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {
  }

  @Post("/create")
  create() {
    return this.provincesService.create();
  }

  @Get()
  provinceFindAll() {
    return this.provincesService.provinceFindAll();
  }
  @Get("/districts")
  findAll() {
    return this.provincesService.districtFindAll();
  }

}
