import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjetService } from './projet.service';
import { CreateProjetDto } from './dto/create-projet.dto';
import { RecaptchaGuard } from '../guards/recaptha.guard';
import { JwtAuthGuard } from '../auth/strategies/local/jwt-auth.guard';

@ApiTags('Projet')
@Controller('projet')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @UseGuards(RecaptchaGuard)
  @Post('new')
  async create(@Body() createProjetDto: CreateProjetDto) {
    // Utilise le DTO pour la création de projet
    try {
      const newProjet = await this.projetService.createProjet(createProjetDto); // Assurez-vous que la méthode createProjet existe dans le service
      if (newProjet) {
        console.log('projet created');
        return {
          success: true,
          message: 'Votre Message a bien été créé avec succès!',
          data: newProjet,
        };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Erreur lors de la création du message!', error: error.message };
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProjets() {
    try {
      const projets = await this.projetService.getAllProjets();
      return { success: true, data: projets };
    } catch (error) {
      console.log(error);
      // Utilisez le logger approprié ici pour éviter l'utilisation de logger.error
      return { success: false, error: error.message };
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('email')
  async getProjetByEmail(@Query('email') email: string) {
    // Utilise Query pour obtenir les paramètres de requête
    try {
      const projet = await this.projetService.getProjetByEmail(email);
      if (!projet) {
        return { success: false, error: 'client non trouvé.' };
      }
      return { success: true, data: projet };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('id')
  async getProjetById(@Query('projetId') projetId: string) {
    // Utilise Query pour obtenir les paramètres de requête
    try {
      const projet = await this.projetService.getProjetById(projetId);
      if (!projet) {
        return { success: false, error: 'client non trouvé.' };
      }
      return { success: true, data: projet };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Erreur lors de la récupération du client.' };
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProjet(@Query('projetId') projetId: string) {
    // Utilise Query pour obtenir les paramètres de requête
    try {
      const deletedProjet = await this.projetService.deleteProjetById(projetId);
      if (!deletedProjet) {
        return { success: false, error: 'client non trouvé.' };
      }
      console.log('projet deleted');
      return { success: true, data: deletedProjet, message: `Le client "${deletedProjet.firstName}" a été supprimé!` };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Erreur lors de la suppression du client.' };
    }
  }

  // Fonction pour marquer une notification comme lue
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put('read')
  async markNotificationAsRead(@Query('projetId') projetId: string) {
    // Utilise Query pour obtenir les paramètres de requête
    try {
      const updatedIsReadMessage = await this.projetService.markNotificationAsRead(projetId);
      if (!updatedIsReadMessage) {
        return { success: false, error: 'client non trouvé.' };
      }
      console.log('projet read');
      return { success: true, data: updatedIsReadMessage, message: `Le message ${projetId} a été marqué comme lu!` };
    } catch (error) {
      console.log(error);
      return { success: false, error: `Erreur lors du marquage du message comme lu: ${error}` };
    }
  }
}
