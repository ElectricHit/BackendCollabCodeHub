import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsuarioModule } from './usuarios/usuario.module';
import { PlanModule } from './planes/plan.module';
import { ProyectosModule } from './proyectos/proyectos.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/collab-code-hub'), UsuarioModule, PlanModule, ProyectosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
