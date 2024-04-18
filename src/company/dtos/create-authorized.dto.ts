import {
  IsEmail,
  IsMobilePhone,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Company } from '../entities/company.entity';

export class CreateAuthorizedDto {
  @IsString()
  @Length(3, 100)
  authorizedPerson: string; // ad soyad

  @IsString()
  @IsMobilePhone('tr-TR') // telefon numarasının tr standartlarına uygun olması validation işlemi
  authorizedPhone: string;

  @IsString()
  @IsEmail()
  authorizedEmail: string;

  @IsString()
  authorizedTitle: string;

  @ValidateNested()
  companyId: Company;
}
