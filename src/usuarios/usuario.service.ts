import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioInt } from 'src/interfaces/usuario.interface';
import { ProyectoInt } from 'src/interfaces/proyecto.interface';
import { CrearProyectoDTO, CrearUsuarioDTO, CrearProyectoUsuarioDTO, ActualizarProyectoDTO } from 'src/dto/usuario.dto';
import { promises } from 'dns';
import { retry } from 'rxjs';
import { type } from 'os';


@Injectable()
export class UsuarioService {
    constructor(@InjectModel("UsuarioDB") private readonly usuarioDB: Model<UsuarioInt>) { }

    async crearUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<UsuarioInt> {
        const usuarioNw = new this.usuarioDB(crearUsuarioDTO);
        await usuarioNw.save();
        return usuarioNw;
    }


    async crearProyecto(crearProyectoUsuarioDTO: CrearProyectoUsuarioDTO): Promise<CrearProyectoDTO | null> {
        const usuarioEn = await this.usuarioDB.findById(crearProyectoUsuarioDTO.IdUsuario);
        if(usuarioEn){
            usuarioEn.Proyectos.push(crearProyectoUsuarioDTO.Proyectos);
            await usuarioEn.save();
            console.log("El proyecto se creo correctamente");
            console.log(crearProyectoUsuarioDTO.Proyectos);
        }else{

            console.log('No se encontró un usuario con el ID proporcionado y no se ha agregado un proyecto.');
        }
        return crearProyectoUsuarioDTO.Proyectos
    }


    





    async actualizarUsuario(usuarioID: string, crearUsuarioDTO: CrearUsuarioDTO): Promise < UsuarioInt > {
    //const usuarioAc = await this.usuarioDB.findByIdAndUpdate(usuarioID, crearUsuarioDTO, { new:true});
    const usuarioAc = await this.usuarioDB.findById(usuarioID);
    console.log(usuarioAc, "Si se actualizo")
        return usuarioAc;
}

    /*async obtenerProyectos(usuarioID:string): Promise<UsuarioInt["Proyectos"] | null>{

        const usuarioPr = await this.usuarioDB.findById(usuarioID);
        const proyectoEn = usuarioPr.Proyectos;
        console.log(proyectoEn)
        return proyectoEn;

        {_id:usuarioID},{Proyectos:true}
    }*/

    async obtenerProyectos(usuarioID: string): Promise < UsuarioInt["Proyectos"] | null > {

    const usuarioPr = await this.usuarioDB.findById(usuarioID);
    const proyectoEn = usuarioPr.Proyectos;
    console.log(proyectoEn)
        return proyectoEn;
}


    async obtenerProyecto(usuarioID: string, proyectoId: string): Promise < CrearProyectoDTO > {

    const usuarioPr = await this.usuarioDB.findById(usuarioID);
    const proyectoEn = usuarioPr.Proyectos.find(proyecto => proyecto._id.toString() === proyectoId);
    console.log(proyectoEn);
    return proyectoEn;
}

    async obtenerUsuarios(): Promise < UsuarioInt[] > {
    const usuarioOb = await this.usuarioDB.find();
    return usuarioOb;
}
    
    async obtenerUsuario(usuarioID: string): Promise < UsuarioInt > {
    const usuarioOb = await this.usuarioDB.findById(usuarioID);
    return usuarioOb;
}

    /*async actualizarContraseña(usuario: string, contrasena: string):Promise<UsuarioInt>{
        

        const updates = {
            contrasena: contrasena
          };
        console.log("Si llamo al servicio de actualizar contraseña")
        const usuarioOb = await this.usuarioDB.findOneAndUpdate({usuario},
            { $set: updates },
            { new: true } )
            return usuarioOb
    }*/


    async actualizarContraseña(usuario: string, contrasena: string, contrasenaAnterior: string): Promise < UsuarioInt | null > {
    const comprobarContra = await this.usuarioDB.findById(usuario);

    if(comprobarContra.contrasena === contrasenaAnterior){

    const updates = {
        contrasena: contrasena
    };
    console.log("Si llamo al servicio de actualizar contraseña")
    const usuarioOb = await this.usuarioDB.findOneAndUpdate({ _id: usuario },
        { $set: updates },
        { new: true })
    console.log(usuarioOb)
    return usuarioOb

}
        else {
    console.log("Contraseña incorrecta")
    return null
}  
    }

    async actualizarProyecto(usuarioID: string , proyecto : string , datosProyecto: CrearProyectoDTO): Promise<Partial<CrearProyectoDTO> | null>{
        const updates = {
            'Proyectos.$[proyecto].nombre': datosProyecto.nombre,
            'Proyectos.$[proyecto].descripcion': datosProyecto.descripcion,
            'Proyectos.$[proyecto].HTML': datosProyecto.HTML,
            'Proyectos.$[proyecto].CSS': datosProyecto.CSS,
            'Proyectos.$[proyecto].JavaScript': datosProyecto.JavaScript
          };

          const proyectoActualizado = await this.usuarioDB.findOneAndUpdate(
            { _id: usuarioID, 'Proyectos._id': proyecto },
            { $set: updates },
            { new: true, arrayFilters: [{ 'proyecto._id': proyecto }] }
          );

          if (proyectoActualizado) {
            console.log('Elementos del proyecto actualizados con éxito');
            return proyectoActualizado;
          } else {
            console.log('No se encontró un usuario con el ID proporcionado o un proyecto con el ID proporcionado en el usuario.');
            return null;
          }
        
    
    }

    



    async actualizarPlan(usuario: string, idPlan: number, cantidad: number): Promise < UsuarioInt > {
    const updates = {
        plan: [
            {
                idPlan: idPlan,
                cantidad: cantidad,
                fechaAdquisicion: new Date()
            }
        ]



    };
    console.log("Si llamo al servicio de actualizar plan")
        const usuarioOb = await this.usuarioDB.findOneAndUpdate({ usuario },
        { $set: updates },
        { new: true })
            return usuarioOb
}





    

    async login(usuario: string, contrasena: string): Promise < UsuarioInt | null > {
    const usuarioObtenido = await this.usuarioDB.findOne({ usuario });
    if(!usuarioObtenido) {
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
