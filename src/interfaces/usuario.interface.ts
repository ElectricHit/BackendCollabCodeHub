export interface UsuarioInt extends Document{
    

    readonly usuario: string,
    readonly correo: string,
    readonly contrasena: string,
    readonly IdPlan: number,
    readonly IdUsuario: number,
    readonly Proyectos: [
    {
        readonly IdUsuario: number,
        readonly IdProyecto: number,
        readonly nombre: string,
        readonly descripcion: string,
        readonly HTML: string,
        readonly CSS: string,
        readonly JavaScript: string

    }
    ]




}


