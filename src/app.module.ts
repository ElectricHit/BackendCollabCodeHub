import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsuarioModule } from './usuarios/usuario.module';
import { PlanModule } from './planes/plan.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}.yrlzetb.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`), UsuarioModule, PlanModule, ProyectosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


'mongodb://127.0.0.1:27017/collab-code-hub'

/*MONGODB_USER=Expertos
MONGODB_PASS=Expertos
MONGODB_CLUSTER=expertos
MONGODB_DATABASE=collab-code-hub*/