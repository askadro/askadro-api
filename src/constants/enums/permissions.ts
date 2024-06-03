import { ROLES } from '@/constants/enums/roles';

enum TypePermission {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export const PermissionsPower = [
  {
    title: ROLES.user,
    power: 0,
    type: TypePermission.INTERNAL,
  },
  {
    title: ROLES.accountant, //muhasebe
    power: 2,
    type: TypePermission.EXTERNAL,
  },
  {
    title: ROLES.admin,
    power: 4,
    type: TypePermission.INTERNAL,
  },
  {
    title: ROLES.owner,
    power: 5,
    type: TypePermission.INTERNAL,
  }, {
    title: ROLES.reporter,
    power: 2,
    type: TypePermission.EXTERNAL,
  },
  {
    title: ROLES.manager,
    power: 3,
    type: TypePermission.INTERNAL,
  },
];