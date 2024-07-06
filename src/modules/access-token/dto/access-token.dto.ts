import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

const MESSAGES = { error: 'Invalid request data' };

export class AccessTokenDto {
  @IsNotEmpty({ message: MESSAGES.error })
  @IsString({ message: MESSAGES.error })
  @IsOptional()
  grant_type: string;

  @IsNotEmpty({ message: MESSAGES.error })
  @IsString({ message: MESSAGES.error })
  @IsOptional()
  client_id: string;

  @IsNotEmpty({ message: MESSAGES.error })
  @IsString({ message: MESSAGES.error })
  @IsOptional()
  client_secret: string;

  @IsNotEmpty({ message: MESSAGES.error })
  @IsString({ message: MESSAGES.error })
  @IsOptional()
  username: string;

  @IsNotEmpty({ message: MESSAGES.error })
  @IsString({ message: MESSAGES.error })
  @IsOptional()
  password: string;
}