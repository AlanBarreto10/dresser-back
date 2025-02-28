import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export function RolProtected(...roles: string[]) {
  return SetMetadata(ROLES_KEY, roles); //guarda los roles permitidos en la metadata de la ruta.
}
