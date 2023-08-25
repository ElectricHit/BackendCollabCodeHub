export class CrearUsuarioDTO{
    readonly usuario: string;
    readonly correo: string;
    readonly contrasena: string;
    readonly plan: planesDTO[];
    readonly IdUsuario: number;
    readonly Proyectos: CrearProyectoDTO[]

}
export class CrearProyectoDTO{
    readonly IdUsuario: number;
    readonly IdProyecto: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly HTML: string;
    readonly CSS: string;
    readonly JavaScript: string;
}
export class planesDTO{ 
    readonly idPlan: number;
    readonly cantidad: number;
    readonly fechaAdquisicion: Date
    
}

export class loginDTO{
    readonly usuario: string;
    readonly contrasena: string
}

export class CambiarContrasenaDTO{
    readonly usuario: string;
    readonly contrasena: string
}