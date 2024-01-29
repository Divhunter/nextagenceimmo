import { Injectable } from '@nestjs/common';
import { ProjetRepository } from './projet.repository';
import { Projet } from './entities/projet.entity';
import { Message } from './entities/message.model';
import { CreateProjetDto, MessageDto } from './dto/create-projet.dto';
import { IProjetService } from '../abstractions/projets/projet.service.interface';

@Injectable()
export class ProjetService implements IProjetService {
  constructor(private readonly projetRepository: ProjetRepository) {}

  async getAllProjets(): Promise<Projet[]> {
    return await this.projetRepository.findAllProjets();
  }

  async getProjetById(projetId: string): Promise<Projet> {
    return await this.projetRepository.findProjetById(projetId);
  }

  async getProjetByEmail(email: string): Promise<Projet> {
    return await this.projetRepository.findProjetByEmail(email.toLowerCase());
  }

  async createProjet(createProjetDto: CreateProjetDto): Promise<Projet | Message> {
    try {
      const existingProjet = await this.getProjetByEmail(createProjetDto.email);

      if (existingProjet) {
        const newMessage: MessageDto = {
          content: createProjetDto.message,
          createdDate: new Date(),
        };
        await this.projetRepository.markProjetNotRead(existingProjet.id);
        return await this.projetRepository.createMessage(existingProjet.id, newMessage);
      } else {
        const newProjet: CreateProjetDto = {
          firstName: createProjetDto.firstName,
          lastName: createProjetDto.lastName,
          email: createProjetDto.email.toLowerCase(),
          phone: createProjetDto.phone,
        };
        const messageDto: MessageDto = {
          content: createProjetDto.message ? createProjetDto.message : 'N/R',
          createdDate: new Date(),
        };

        return await this.projetRepository.createProjet(newProjet, messageDto);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProjetById(projetId: string): Promise<Projet> {
    return await this.projetRepository.deleteProjetById(projetId);
  }

  async markNotificationAsRead(projetId: string): Promise<any> {
    return await this.projetRepository.markNotificationAsRead(projetId);
  }
}
