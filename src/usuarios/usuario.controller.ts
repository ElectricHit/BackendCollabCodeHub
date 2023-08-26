import { Controller, Get, Post, Put, Patch,Res,HttpStatus, Body , Param,NotFoundException} from '@nestjs/common';
import { CrearUsuarioDTO, CrearProyectoDTO,loginDTO, CambiarContrasenaDTO, PlanesDTO, CambiarPlanDTO, CrearProyectoUsuarioDTO, ActualizarProyectoDTO} from 'src/dto/usuario.dto';
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
            usuario: usuarioNuevo
        })

    }

    @Post("/crear/proyecto")
    async crearProyecto(@Res() res, @Body() crearProyectoUsuarioDTO: CrearProyectoUsuarioDTO){
       const usuarioNuevo = await this.usuarioService.crearProyecto(crearProyectoUsuarioDTO);        
        return res.status(HttpStatus.OK).json({
            mensaje: "El usuario a sido encontrado y se ha agregado el proyecto",
            usuario: usuarioNuevo
        })

    }


    @Patch("/contrasena")
    async cambiarContrasena(@Res() res, @Body() cambiarContrasenaDTO : CambiarContrasenaDTO){
       const usuarioContra = await this.usuarioService.actualizarContraseña(cambiarContrasenaDTO._id, cambiarContrasenaDTO.contrasena, cambiarContrasenaDTO.contrasenaAnterior);
        
        if(usuarioContra==null){
            return res.status(HttpStatus.OK).json({
                mensaje: "La contraseña no se cambio",
        })    

        }else{

        console.log(cambiarContrasenaDTO);
        return res.status(HttpStatus.OK).json({
        mensaje: "La contraseña se cambio con exito",
        usuarioContra: usuarioContra
        })

        }

        

    }

    @Patch("/plan")
    async cambiarPlan(@Res() res, @Body() cambiarPlanDTO : CambiarPlanDTO){
       const usuarioPlan = await this.usuarioService.actualizarPlan(cambiarPlanDTO.usuario, cambiarPlanDTO.idPlan, cambiarPlanDTO.cantidad);
       
        console.log(cambiarPlanDTO);
        return res.status(HttpStatus.OK).json({
            mensaje: "El plan se cambio con exito",
            usuarioPlan: usuarioPlan
        })

    }


    @Patch("/actualizar/proyecto")
    async actualizarProyecto(@Res() res, @Body() actualizarProyectoDTO : ActualizarProyectoDTO){
       const proyectoAct = await this.usuarioService.actualizarProyecto(actualizarProyectoDTO.usuarioID, actualizarProyectoDTO.proyecto, actualizarProyectoDTO.datosProyecto);
       
        return res.status(HttpStatus.OK).json({
            mensaje: "El plan se cambio con exito",
            actualizarProyectoDTO: actualizarProyectoDTO
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

    
    @Get('proyectos/:idUsuario')
    async obtenerProyectos(@Res() res, @Param("idUsuario") idUsuario){
        const proyectosOb = await this.usuarioService.obtenerProyectos(idUsuario);
        const nombresProyectos = proyectosOb.map(proyecto => ({ _id: proyecto._id, nombre: proyecto.nombre}));

        console.log(idUsuario)
        return res.status(HttpStatus.OK).json({
            message: "si obtuvo todos los proyectos",
            nombresProyectos: nombresProyectos
        })
    }


    @Get('proyectos/:idUsuario')
    async obtenerNombresProyectos(@Res() res, @Param("idUsuario") idUsuario) {
        const proyectosOb = await this.usuarioService.obtenerProyectos(idUsuario);
        const nombresProyectos = proyectosOb.map(proyecto => proyecto.nombre);
    
        return res.status(HttpStatus.OK).json({
            message: "Obtenidos los nombres de los proyectos",
            nombresProyectos: nombresProyectos
        });
    }
    


    @Get('proyecto/:idUsuario')
    async obtenerProyecto(@Res() res, @Body() crearProyectoDTO: CrearProyectoDTO,@Param("idUsuario") idUsuario){
        const proyectoOb = await this.usuarioService.obtenerProyecto(idUsuario,crearProyectoDTO._id);
        console.log(idUsuario)
        return res.status(HttpStatus.OK).json({
            message: "si funca",
            proyectosOb: proyectoOb
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

}
