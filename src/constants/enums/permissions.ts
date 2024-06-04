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
    endpoints: [
      '/users/me',
      '/users/profile',
    ],
  },
  {
    title: ROLES.accountant, //muhasebe
    power: 2,
    type: TypePermission.EXTERNAL,
    endpoints: [
      '/invoices',
      '/reports',
    ],
  },
  {
    title: ROLES.admin,
    power: 4,
    type: TypePermission.INTERNAL,
    endpoints: [
      '/users',
      '/roles',
      '/permissions',
    ],
  },
  {
    title: ROLES.owner,
    power: 5,
    type: TypePermission.INTERNAL,
    endpoints: [
      '*', // Tüm endpoint'lara erişim
    ],
  },
  {
    title: ROLES.reporter,
    power: 2,
    type: TypePermission.EXTERNAL,
    endpoints: [
      '/reports/daily',
      '/reports/weekly',
    ],
  },
  {
    title: ROLES.manager,
    power: 3,
    type: TypePermission.INTERNAL,
    endpoints: [
      '/users/team',
      '/projects',
    ],
  },
];