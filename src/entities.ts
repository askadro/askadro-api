import { User } from './modules/users/entities/user.entity';
import { Company } from './modules/company/entities/company.entity';
import { Authorized } from './modules/company/entities/authorized.entity';
import { Job } from './modules/jobs/job.entity';
import { Province } from './modules/provinces/entities/province.entity';
import { District } from './modules/provinces/entities/district.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';


export const Entities: [
  User: typeof User,
  Company: typeof Company,
  Authorized: typeof Authorized,
  Job: typeof Job,
  Province: typeof Province,
  District: typeof District,
  Ticket: typeof Ticket,
  Address: typeof Address,
] = [
  User,
  Company,
  Authorized,
  Job,
  Province,
  District,
  Ticket,
  Address,
];
