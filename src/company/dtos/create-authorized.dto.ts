import { IsString, ValidateNested } from 'class-validator';
import { Authorized } from '../entities/authorized.entity';
import { Company } from '../entities/company.entity';

export class CreateAuthorizedDto {
  @IsString()
  authorizedPerson: string;

  @IsString()
  authorizedPhone: string;

  @IsString()
  authorizedEmail: string;

  @IsString()
  authorizedTitle: string;

  @ValidateNested()
  companyId: Company;
}
