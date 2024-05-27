import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';

@Injectable()
export class ProvincesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Province) private provincesRepository: Repository<Province>,
    @InjectRepository(District) private districtRepository: Repository<District>,
  ) {}

  async create() {
    try {

      const response = await firstValueFrom(this.httpService.get("https://turkiyeapi.dev/api/v1/provinces"));

      if (response.data.status !== "OK") {
        new NotFoundException({ message: "Province not found", error: response.data });
      }

      const provinces: object = response.data.data;

      Object.values(provinces).map(async province => {

        const provinceCreate = this.provincesRepository.create({
          name: province.name
        });
        const saveProvince = await this.provincesRepository.save(provinceCreate);

        const districts = province.districts;

        districts.map((district: any) => {

          this.districtRepository.save({
            name: district.name,
            province: saveProvince
          });
        });
      });

      return response.data;
    } catch (error) {

      throw new NotFoundException({ message: "Province not found", error: error });
    }
  }

  async findAllProvinces() {
    return this.provincesRepository.find();
  }

  async findAllDistricts() {
    return this.districtRepository.find();
  }

  async findDistrictsByProvince(provinceId: string) {
    const province = await this.provincesRepository.findOne({
      where: { id: provinceId },
      relations: ['districts'],
    });
    if (!province) {
      throw new NotFoundException('Province not found');
    }
    return province.districts;
  }
}


