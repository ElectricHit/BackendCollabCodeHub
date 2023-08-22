import { Schema } from "mongoose";

export const proyectoSchema = new Schema({
    nombre: String,
    descripcion: String,
    html: String,
    css: String,
    javascript: String
})

export const usuarioSchema = new Schema({
    id: Number,
    nombre: String,
    contrasena: String,
    plan: String,
    proyectos: Array
})