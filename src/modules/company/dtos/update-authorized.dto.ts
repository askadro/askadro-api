import { CreateAuthorizedDto } from '@/modules/company/dtos/create-authorized.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAuthorizedDto extends PartialType(CreateAuthorizedDto) {}