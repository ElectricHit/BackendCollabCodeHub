import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioInt } from 'src/interfaces/usuario.interface';
import { CrearUsuarioDTO } from 'src/dto/usuario.dto';
import { promises } from 'dns';
import { retry } from 'rxjs';


@Injectable()
export class UsuarioService {
    constructor(@InjectModel("UsuarioDB") private readonly usuarioDB: Model<UsuarioInt>){}

    async crearUsuario(crearUsuarioDTO : CrearUsuarioDTO): Promise<UsuarioInt>{
        const usuarioNw= new this.usuarioDB(crearUsuarioDTO);
        await usuarioNw.save();
        return usuarioNw;
    }

    async actualizarUsuario(usuarioID:string, crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInt>{
        //const usuarioAc = await this.usuarioDB.findByIdAndUpdate(usuarioID, crearUsuarioDTO, { new:true});
        const usuarioAc = await this.usuarioDB.findById(usuarioID);
        console.log(usuarioAc,"Si se actualizo")
        return usuarioAc;
    }

    async obtenerUsuario(usuarioID:string): Promise<UsuarioInt>{
        const usuarioOb = await this.usuarioDB.findById(usuarioID);
        return usuarioOb;
    }


    async obtenerUsuarios(): Promise<UsuarioInt[]>{
        const usuarioOb = await this.usuarioDB.find();
        return usuarioOb;
    }

    async actualizarContraseña(usuario: string, contrasena: string):Promise<UsuarioInt>{
        const updates = {
            contrasena: contrasena
          };
        console.log("Si llamo al servicio de actualizar contraseña")
        const usuarioOb = await this.usuarioDB.findOneAndUpdate({usuario},
            { $set: updates },
            { new: true } )
            return usuarioOb
    }


    crearProyecto(){

    }

    actualizarProyecto(){

    }

    obtenerProyecto(){

    }

    obtenerProyectos(){

    }

    async login(usuario: string, contrasena: string): Promise<UsuarioInt | null>{
        const usuarioObtenido = await this.usuarioDB.findOne({usuario});
        if(!usuarioObtenido){
            throw new UnauthorizedException('Usuario no encontrado');
        }
        console.log(usuarioObtenido.contrasena)
        if(usuarioObtenido.contrasena != contrasena){
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        console.log("Autentificacion exitosa");
        return usuarioObtenido;

    }


}
