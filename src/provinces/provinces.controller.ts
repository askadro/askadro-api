import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { firstValueFrom } from "rxjs";

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
