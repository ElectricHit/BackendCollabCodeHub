import { Document } from "mongoose";

export interface Usuario extends Document {
    id?: number,
    nombre: String,
    contrasena: String,
    plan: String,
    proyectos: Array<any>
}