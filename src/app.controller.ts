import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() u) {
    if(u.usuario == 'Roxana' && u.contrasena == '123'){
      return {exito: true, message: 'Inicio de sesión exitoso', usuario: u.usuario}
    }else{
      return {exito:false, message: 'Error al iniciar sesion'}
    }
  }
}
