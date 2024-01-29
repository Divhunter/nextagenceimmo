import { Projet, Message } from '@prisma/client';
import { CreateProjetDto } from '../../projet/dto/create-projet.dto';

export interface IProjetService {
  getAllProjets(): Promise<Projet[]>;
  getProjetById(projetId: string): Promise<Projet | null>;
  getProjetByEmail(email: string): Promise<Projet | null>;
  createProjet(createProjetDto: CreateProjetDto): Promise<Projet | Message>;
  deleteProjetById(projetId: string): Promise<Projet | null>;
  markNotificationAsRead(projetId: string): Promise<any>;
}
