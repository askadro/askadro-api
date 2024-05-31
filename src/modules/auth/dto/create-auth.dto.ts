import { IsEmail, IsOptional, IsString, MinLength, IsUUID, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { Auth } from '../entities/auth.entity';
import { IsUnique } from '@/utils/validations';
import { ROLES } from '@/constants/permissions/roles';

export class CreateAuthDto {
  @IsString({ message: 'Email adresi bir string olmalıdır' })
  @IsEmail({}, { message: 'Geçerli bir email adresi olmalıdır' })
  @IsUnique(Auth, 'email', { message: 'Bu email adresi zaten kayıtlı' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Kullanıcı adı bir string olmalıdır' })
  @IsUnique(Auth, 'username', { message: 'Bu kullanıcı adı zaten kayıtlı.' })
  @IsOptional()
  username?: string;

  @IsString({ message: 'Şifre bir string olmalıdır' })
  @MinLength(4, { message: 'Şifre en az 4 karakter olmalıdır' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Salt bir string olmalıdır' })
  salt?: string;

  @IsOptional()
  @IsString({ message: 'Refresh token bir string olmalıdır' })
  refreshToken?: string;

  @IsOptional()
  @IsString({ message: 'Refresh token son kullanma tarihi bir tarih olmalıdır' })
  refreshTokenExpiryTime?: Date;

  @IsOptional()
  @IsUUID('4', { message: 'Şirket ID geçerli bir UUID olmalıdır' })
  companyId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Kullanıcı ID geçerli bir UUID olmalıdır' })
  userId?: string;

  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(ROLES,{ each: true })
  roles:ROLES[]
}
