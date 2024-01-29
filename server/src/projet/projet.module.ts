import { Module } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { ProjetController } from './projet.controller';
import { ProjetRepository } from './projet.repository';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [ProjetController],
  providers: [ProjetService, ProjetRepository, PrismaService],
})
export class ProjetModule {}
