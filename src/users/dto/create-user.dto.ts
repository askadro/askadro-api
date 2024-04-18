import { IsByteLength, IsEnum, IsOptional, IsString } from "class-validator";
import { userGenderEnum } from "../enums/user.gender.enum";
import { UserStatusEnum } from "../enums/user.status.enum";
import { IsUnique } from "../../utils/validations/unique/is-unique";

export class CreateUserDto {

  @IsString({
    message: "kimlik numarası bir dize olmalıdır"
  })
  @IsByteLength(11, 11, {
    message: "kimlik numarası 11 haneli olmalıdır"
  })
  @IsUnique({
    tablaName: "user",
    column: "Identity"
  }, {
    message: "bu kimlik numarası zaten kayıtlı"
  })
  @IsOptional()
  Identity: string;

  @IsString({
    message: "adı bir dize olmalıdır"
  })
  @IsOptional()
  firstName: string;

  @IsString({
    message: "soyadı bir dize olmalıdır"
  })
  @IsOptional()
  lastName: string;


  @IsString({
    message: "doğum tarihi bir Date örneği olmalıdır"
  })
  @IsOptional()
  birthDate: Date;

  @IsEnum(userGenderEnum, {
    message: "cinsiyet aşağıdaki değerlerden biri olmalıdır: erkek, kadın, diğer"
  })
  @IsOptional()
  gender: userGenderEnum;

  @IsOptional()
  @IsEnum(UserStatusEnum, {
    message: "durumu aşağıdaki değerlerden biri olmalıdır: AKTIF, INAKTIF, SILINMIŞ"
  })
  status: UserStatusEnum;

}
