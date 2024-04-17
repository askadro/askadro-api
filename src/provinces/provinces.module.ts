import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Province } from "./entities/province.entity";
import { District } from "./entities/district.entity";

@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Province,District])],
  controllers: [ProvincesController],
  providers: [ProvincesService],
  exports: [ProvincesService],
})
export class ProvincesModule {}
