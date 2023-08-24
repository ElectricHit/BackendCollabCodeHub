import {Schema} from "mongoose"

export const UsuarioSchema = new Schema ({
    usuario: String,
    correo: String,
    contrasena: String,
    IdPlan: Number,
    IdUsuario: Number,
    Proyectos: [
{
        IdUsuario: Number,
        IdProyecto: Number,
        nombre: String,
        descripcion: String,
        HTML: String,
        CSS: String,
        JavaScript: String
    
}
    ]

});


