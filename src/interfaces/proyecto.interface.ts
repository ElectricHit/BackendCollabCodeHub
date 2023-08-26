export interface ProyectoInt extends Document{
    
        readonly IdUsuario: number,
        readonly IdProyecto: number,
        readonly nombre: string,
        readonly descripcion: string,
        readonly HTML: string,
        readonly CSS: string,
        readonly JavaScript: string
}