export interface UsuarioInt extends Document{
    

    readonly usuario: string,
    readonly correo: string,
    readonly contrasena: string,
    readonly plan: [{
        readonly idPlan: number,
        readonly cantidad: number,
        readonly fechaAdquisicion: Date
    }
    ],
    readonly IdUsuario: number,
    readonly Proyectos: [
    {
        _id: any
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


