import { Controller, Get, Post, Put, Patch,Res,HttpStatus, Body } from '@nestjs/common';
import { CrearUsuarioDTO, CrearProyectoDTO } from 'src/dto/usuario.dto';


@Controller('usuario')
export class UsuarioController {
    @Post()
    crearUsuario(@Res() res, @Body() crearUsuarioDTO : CrearUsuarioDTO){
        console.log(crearUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            mensaje: "El usuario a sido creado con exito"
        })

    }



}
