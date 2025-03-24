import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { CreateRoleDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { Role } from './entities/role.entity';



@Injectable()
export class AuthService {
  
  private readonly logger = new Logger('UserService');
  private clienteWEB = '898761456766-4tovmccrocvocaan4kf4kr87p5rrmnqg.apps.googleusercontent.com';
  private clienteAndroid = '898761456766-70gi5l6mjcf4ius97a1j66j2j8tt45t0.apps.googleusercontent.com'

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      
      const role = await this.roleRepository.findOne({ where: { type: 'user' } });

      if (!role) {
        throw new NotFoundException(`El rol por defecto 'user' no existe en la base de datos.`);
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        rol: role
      });
      await this.userRepository.save(user);
      return {
        ...user,
        token: this.getJwtToken({ id: user.id})
      };
    } catch (error) {
        this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {email},
      relations: ['rol'],
      select: {email: true, password: true, id: true, name: true}
    });

    if(!user) throw new UnauthorizedException('Credentials are not valid (email)');

    if(!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id})
    };
    
  }

  async googleLogin(token: string){
    try {
      // 1️⃣ Verificar el token de Google
      const client = new OAuth2Client(this.clienteWEB);

      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: [
            this.clienteWEB,
            this.clienteAndroid
          ]
      });

      // 2️⃣ Obtener los datos del usuario
      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Token inválido');

      const { email, name} = payload;

      // 3️⃣ Buscar si el usuario ya existe en la base de datos
      let user = await this.userRepository.findOne({ where: { email } });

      const role = await this.roleRepository.findOne({ where: { type: 'user' } });

      if (!role) {
        throw new NotFoundException(`El rol por defecto 'user' no existe en la base de datos.`);
      }


      // 4️⃣ Si no existe, lo creamos
      if (!user) {
          user = this.userRepository.create({
              email,
              name,
              password: 'GOOGLE_AUTH',
              rol: role,
              provider: 'google' 
          });

          await this.userRepository.save(user);
      }

      // 5️⃣ Generar y devolver el token JWT
      return {
          ...user,
          token: this.getJwtToken({ id: user.id })
      };

  } catch (error) {
      console.error('Error en Google Sign-In:', error);
      throw new UnauthorizedException('No se pudo verificar el token de Google');
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private handleDBExceptions(error: any): never{
      if(error.code == '23505')
        throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  //!-------------------------------------------------USERS-------------------------------------------------!//

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: {id} });
    if (!user) {
      throw new NotFoundException(`El usuario no existe en la base de datos.`);
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('users');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  //!-------------------------------------------------ROLES-------------------------------------------------!//

  async getAllRoles() {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async getRoleById(id: string) {
    const rol = await this.roleRepository.findOne({ where: {id} });
    if (!rol) {
      throw new NotFoundException(`El rol no existe en la base de datos.`);
    }
    return rol;
  }

  async createRole(createRole: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRole);
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      this.handleDBExceptions(error)
    }
      
  }

  async deleteRole(id: string) {
    const rol = await this.getRoleById(id);
    if (!rol) {
      throw new NotFoundException(`El rol no existe en la base de datos.`);
    }
    await this.roleRepository.remove(rol);
  }

  async deleteAllRoles() {
    const query = this.roleRepository.createQueryBuilder('roles');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }
  
}
