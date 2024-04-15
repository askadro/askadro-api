import { IsArray, IsEmail, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateJobsDto {
  @IsString()
  company: string;

  @IsString()
  user: string;

  @IsString()
  time: string;
}
