import { Column } from 'typeorm';
import { DEFAULT_PW } from '@/constants/app';
import { ROLES } from '@/constants/enums/roles';
import { BaseEntity } from '@/common/entities/BaseEntity';

export abstract class AuthEntity extends BaseEntity {

}