export class CrearUsuarioDTO{
    readonly usuario: string;
    readonly correo: string;
    readonly contrasena: string;
    readonly plan: PlanesDTO[];
    readonly IdUsuario: number;
    readonly Proyectos: CrearProyectoDTO[]

}
export class CrearProyectoDTO{
    _id: any
    readonly IdUsuario: number;
    readonly IdProyecto: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly HTML: string;
    readonly CSS: string;
    readonly JavaScript: string;
}
export class PlanesDTO{ 
    readonly idPlan: number;
    readonly cantidad: number;
    readonly fechaAdquisicion: Date
    
}

export class loginDTO{
    readonly usuario: string;
    readonly contrasena: string
}

export class CambiarContrasenaDTO{
    readonly _id: any;
    readonly contrasena: string
    readonly contrasenaAnterior: string
}

export class CambiarPlanDTO{
    readonly usuario: string;
    readonly idPlan: number;
    readonly cantidad: number;
    readonly fechaAdquisicion: Date
}