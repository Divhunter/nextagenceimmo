import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../communs/utils/mail.service';
import { TokenService } from '../communs/utils/token.service';
import { AuthRepository } from './auth.repositor';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthRepository, MailService, PrismaService, TokenService, JwtService, ConfigService], // Ajoutez vos services et repositories ici
  exports: [AuthService, AuthRepository], // Si vous souhaitez que le service soit disponible à l'injection dans d'autres modules
})
export class AuthModule {}
