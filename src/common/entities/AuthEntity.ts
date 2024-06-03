import { Column } from 'typeorm';
import { DEFAULT_PW } from '@/constants/app';
import { ROLES } from '@/constants/enums/roles';
import { BaseEntity } from '@/common/entities/BaseEntity';

export abstract class AuthEntity extends BaseEntity{
  @Column({
    default: null,
    nullable: true,
  })
  email: string;

  @Column({
    default: null,
    nullable: true,
  })
  username: string;

  @Column({
    default:DEFAULT_PW,
  })
  password: string;
  @Column({
    nullable: true,
  })
  salt?: string;

  @Column({
    nullable: true,
  })
  refreshToken?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  refreshTokenExpiryTime?: Date;

  @Column({
    type: 'enum',
    enum: ROLES,
    array: true,
    default: [ROLES.user],
  })
  roles:ROLES[]
}