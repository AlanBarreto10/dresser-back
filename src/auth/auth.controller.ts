import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, CreateRoleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createuserDto: CreateUserDto) {
    return this.authService.create(createuserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('google-login')
  loginGoogleUser(@Body('token') token: string) {
    return this.authService.googleLogin(token);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('check-status')
  checkStatus(@GetUser() user: User){
    return this.authService.checkAuthStatus(user)
  }

  @Post('new-role')
  createRole(@Body() createroleDto: CreateRoleDto ) {
    return this.authService.createRole(createroleDto);
  }

  @Get('private')
  //@UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User){
    return {
      ok: true,
      user
    }
  }
}
