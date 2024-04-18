import { IsByteLength, IsEnum, IsOptional, IsString, Validate } from "class-validator";
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
},{
  message: "bu kimlik numarası zaten kayıtlı"
})
  Identity: string;

  @IsString({
    message: "adı bir dize olmalıdır"
  })
  firstName: string;

  @IsString({
    message: "soyadı bir dize olmalıdır"
  })
  lastName: string;


  @IsString({
    message: "doğum tarihi bir Date örneği olmalıdır"
  })
  birthDate: Date;

  @IsEnum(userGenderEnum, {
    message: "cinsiyet aşağıdaki değerlerden biri olmalıdır: erkek, kadın, diğer"
  })
  gender: userGenderEnum;

  @IsOptional()
  @IsEnum(UserStatusEnum, {
    message: "durumu aşağıdaki değerlerden biri olmalıdır: AKTIF, INAKTIF, SILINMIŞ"
  })
  status: UserStatusEnum;

}
