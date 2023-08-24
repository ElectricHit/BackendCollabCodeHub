import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';

@Module({
  providers: [ProyectosService],
  controllers: [ProyectosController]
})
export class ProyectosModule {}
