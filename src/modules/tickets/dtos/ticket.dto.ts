import { Expose, Type } from 'class-transformer';

// User DTO
export class UserDto {
  @Expose()
  id: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
}

// Company DTO
export class CompanyDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
  @Expose()
  phone: string;

  @Expose()
  shortName: string;

  @Expose()
  registrationNumber: string;

  @Expose()
  timeOfPayment: string;


  @Expose()
  totalWorkingTime: string;

}

// Job DTO
export class JobDto {
  @Expose()
  id: string;

  @Expose()
  enterTime: string;

  @Expose()
  exitTime: string;

  @Expose()
  extraTime: string;

  @Expose()
  extraPrice: string;
}

// Ticket DTO
export class TicketDto {
  @Expose()
  id: string;

  @Expose()
  enterTime: string;

  @Expose()
  exitTime: string;

  @Expose()
  ticketDate: string;

  @Expose()
  ticketNotes: string;

  @Expose()
  status: string;

  @Expose()
  createdAt:Date

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @Expose()
  @Type(() => JobDto)
  jobs: JobDto[];
}
