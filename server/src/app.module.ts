import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetModule } from './projet/projet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { InitService } from './auth/init/init.service';
import { JwtStrategy } from './auth/strategies/local/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local/local.strategy';
import { TokenService } from './communs/utils/token.service';

@Module({
  imports: [ProjetModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, TokenService, LocalStrategy, JwtStrategy, ConfigService, InitService, PrismaService],
})
export class AppModule {}
