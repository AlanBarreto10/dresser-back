import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/rol.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Si no se definieron roles, se permite el acceso
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (!user || !user.rol) {
      return false; // Si no hay usuario autenticado o no tiene rol, denegar acceso
    }

    return requiredRoles.includes(user.rol.type); // Verifica si el rol del usuario está en la lista permitida
  }
}
