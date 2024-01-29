import { $Enums, VerificationToken } from '@prisma/client';

// Modèle VerificationToken
export interface VerificationTokenModel extends VerificationToken {
  id: string;
  userId: string;
  token: string;
  isUsed: boolean;
  createdAt: Date;
  expiresAt: Date;
  type: $Enums.VerificationTokenType | null;
}

// Enum pour les types de jeton de vérification
export enum VerificationTokenType {
  InitialVerification = 'initial_verification',
  ResetEmail = 'reset_email',
  // Ajoutez d'autres types de jetons au besoin
}
