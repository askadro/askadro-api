import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IsUnique } from '@/utils/validations';

export class CreateAuthDto {
  @IsString({
    message: 'Email adresi bir string olmalıdır',
  })
  @IsEmail({}, {
    message: 'geçerli bir email adresi olmalıdır',
  })
  @IsUnique({
    column: 'email',
    tableName: 'auths',
  }, {
    message: 'bu email adresi zaten kayıtlı',
  })
  @IsOptional()
  email: string;

  @IsString({
    message: 'username bir String olmalıdır',
  })
  @IsUnique({
    column: 'username',
    tableName: 'auths',
  })
  @IsOptional()
  username: string;

  @IsString({
    message: 'sifre bir String olmalıdır',
  })
  @MinLength(4, {
    message: 'sifre en az 4 karakter olmalıdır',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: 'salt bir String olmalıdır',
  })
  salt?: string;

  @IsOptional()
  @IsString({
    message: 'refreshToken bir String olmalıdır',
  })
  refreshToken?: string;

  @IsOptional()
  @IsString({
    message: 'refreshTokenExpiryTime bir Date olmalıdır',
  })
  refreshTokenExpiryTime?: Date;
}
