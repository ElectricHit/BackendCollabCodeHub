export class CrearUsuarioDTO{
    readonly usuario: string;
    readonly correo: string;
    readonly contrasena: string;
    readonly IdPlan: number;
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