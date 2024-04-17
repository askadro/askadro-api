import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { userGenderEnum } from "../enums/user.gender.enum";
import { UserStatusEnum } from "../enums/user.status.enum";

export class CreateUserDto {

  @IsString({
    message: "kimlik numarası bir dize olmalıdır"
  })
  Identity: string;
  @IsString({
    message: "adı bir dize olmalıdır"
  })
  first_name: string;

  @IsString({
    message: "soyadı bir dize olmalıdır"
  })
  last_name: string;

  @IsString({
    message: 'yaş, belirtilen kısıtlamalara uygun bir sayı olmalıdır'
  })
  age: string;

  @IsString({
    message: 'doğum tarihi bir Date örneği olmalıdır'
  })
  birth_date: Date;

  @IsEnum(userGenderEnum,{
    message:"cinsiyet aşağıdaki değerlerden biri olmalıdır: erkek, kadın, diğer"
  })
  gender: userGenderEnum;

  @IsOptional()
  @IsEnum(UserStatusEnum,{
    message:"durumu aşağıdaki değerlerden biri olmalıdır: AKTIF, INAKTIF, SILINMIŞ"
  })
  status: UserStatusEnum;

}
