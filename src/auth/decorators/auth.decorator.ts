
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';
import { ValidRoles } from '../interfaces/valid-roles';
import { RolProtected } from './rol.decorator';

export function Auth(...roles: string[]) {
  return applyDecorators(
    UseGuards(AuthGuard(), RolesGuard),
    RolProtected(...roles)
  );
}
