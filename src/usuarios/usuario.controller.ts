import { Controller, Get, Post, Put, Patch,Res,HttpStatus, Body , Param,NotFoundException} from '@nestjs/common';
import { CrearUsuarioDTO, CrearProyectoDTO } from 'src/dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){}


    @Post("/crear")
    async crearUsuario(@Res() res, @Body() crearUsuarioDTO : CrearUsuarioDTO){
       const usuarioNuevo = await this.usuarioService.crearUsuario(crearUsuarioDTO);
        
        console.log(crearUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            mensaje: "El usuario a sido creado con exito",
            usuarioNuevo: usuarioNuevo
        })

    }



    @Post()





    @Get('a/:idUsuario')
    async obtenerUsuario(@Res() res, @Param("idUsuario") idUsuario){
        const usuarioObtenido = await this.usuarioService.obtenerUsuario(idUsuario);
        console.log(idUsuario)
        if(!usuarioObtenido) throw new NotFoundException("El usuario no existe");
        return res.status(HttpStatus.OK).json({
            usuarioObtenido:usuarioObtenido

        })

    }


    @Get('usuarios/:id')
    async obtenerUsuario(@Res() res, @Param("id") idUser){
        const usuario = await this.usuariosService.getUsuario(idUser);
        console.log("Si recibo algo")
        if(!usuario) throw new NotFoundException("Ayuda esto no funciona");
        return res.status(HttpStatus.OK).json({
          usuario:usuario  
        });

    }


    @Get("/usuario")
    async obtenerUsuarios(@Res() res){
        const usuarioObtenido = await this.usuarioService.obtenerUsuarios();
        if(!usuarioObtenido) throw new NotFoundException("No hay usuarios");
        res.status(HttpStatus.OK).json({
            usuarioObtenido:usuarioObtenido

        })

    }

}
