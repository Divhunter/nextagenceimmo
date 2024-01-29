import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  // Méthode pour vérifier la validité d'un token avec la secretKey
  verifyToken(token: string, secretKey: string): any {
    try {
      const verifiedToken = jwt.verify(token, secretKey);

      // Si le jeton est vérifié avec succès, il est valide
      return verifiedToken;
    } catch (error) {
      console.log('token:', error);
      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException('Token expiré', HttpStatus.UNAUTHORIZED);
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new HttpException('Token invalide', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('Erreur lors de la vérification du token', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
