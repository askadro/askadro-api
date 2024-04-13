import { IsString } from "class-validator";

export class CreateJobsDto {
    @IsString()
    content:string
}