import { Authorized } from './company/entities/authorized.entity';
import { Company } from './company/entities/company.entity';
import { Job } from './jobs/job.entity';
import { District } from './provinces/entities/district.entity';
import { Province } from './provinces/entities/province.entity';
import { User } from './users/entities/user.entity';

export const Entities = [User, Company, Authorized, Job, Province, District];
