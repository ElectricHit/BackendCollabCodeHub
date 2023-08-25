import {Schema} from "mongoose"

export const UsuarioSchema = new Schema ({
    usuario: String,
    correo: String,
    contrasena: String,
    plan: [{
        idPlan: Number,
        cantidad: Number,
        fechaAdquisicion:{
            type : Date,
            default: Date.now
        }
    }
    ],
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


