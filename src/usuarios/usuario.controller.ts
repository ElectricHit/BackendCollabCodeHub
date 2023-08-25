import { Controller, Get, Post, Put, Patch,Res,HttpStatus, Body , Param,NotFoundException} from '@nestjs/common';
import { CrearUsuarioDTO, CrearProyectoDTO,loginDTO } from 'src/dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService){}


    @Post("/crear")
    async crearUsuario(@Res() res, @Body() crearUsuarioDTO : CrearUsuarioDTO){
       const usuarioNuevo = await this.usuarioService.crearUsuario(crearUsuarioDTO);
        
        console.log(crearUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            mensaje: "El usuario a sido creado con exito",
            usuarioNuevo: usuarioNuevo
        })

    }

    @Get("/usuarios")
    async obtenerUsuarios(@Res() res){
        const usuarioObtenido = await this.usuarioService.obtenerUsuarios();
        if(!usuarioObtenido) throw new NotFoundException("No hay usuarios");
        res.status(HttpStatus.OK).json({
            usuarioObtenido:usuarioObtenido

        })

    }


    @Get('/:idUsuario')
    async obtenerUsuario(@Res() res, @Param("idUsuario") idUsuario){
        const usuarioObtenido = await this.usuarioService.obtenerUsuario(idUsuario);
        console.log(idUsuario)
        if(!usuarioObtenido) throw new NotFoundException("El usuario no existe");
        return res.status(HttpStatus.OK).json({
            usuarioObtenido:usuarioObtenido

        })

    }


    @Put("actualizar/:idUsuario")
    async actualizarUsuario(@Res() res,@Body() crearUsuarioDTO: CrearUsuarioDTO, @Param("idUsario") idUsuario){
        const usuarioActualizado = await this.usuarioService.actualizarUsuario(idUsuario,crearUsuarioDTO);
        if(!usuarioActualizado) throw new NotFoundException("El usuario no se actualizo");
        return res.status(HttpStatus.OK).json({
            message:"Usuario actualizado",
            usuarioActualizado: usuarioActualizado

        })

    }

    @Post('/login')
    async login(@Res() res, @Body() loginDTO: loginDTO){
        
    const usuario = await this.usuarioService.login(
      loginDTO.usuario,
      loginDTO.contrasena,
      );
    
      if (!usuario) {
        console.log("No se pudo encontrar al usuario")
        return {exito:false, message: 'Error al iniciar sesion'}
      }

      return res.status(HttpStatus.OK).json({
        exito: true,
        mensaje: 'Usuario autenticado correctamente',
        usuario: usuario
      });
    } 



    /*@Post('/login')
    login(@Body() u) {
    if(u.usuario == 'Roxana' && u.contrasena == '123'){
      return {exito: true, message: 'Inicio de sesión exitoso', usuario: u.usuario}
    }else{
      return {exito:false, message: 'Error al iniciar sesion'}
    }
  }*/
}
