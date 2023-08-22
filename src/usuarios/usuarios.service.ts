import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './interfaces/usuarios';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {

  constructor(@InjectModel('usuarios') private usuarioModel: Model<Usuario>) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    return await this.usuarioModel.find();
  }

  async findOne(id: String) {
    await this.usuarioModel.findById(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
