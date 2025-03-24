import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { Role } from './entities/role.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
    imports: [], //USA CONFIG MODULE
    inject: [], //USA CONFIG MODULE
    useFactory: () => { //USA CONFIG MODULE
      return {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '6h'
        }
      }
    } 
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule, AuthService]
})
export class AuthModule {}
