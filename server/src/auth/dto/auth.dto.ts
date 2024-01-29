import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class ConfirmUserDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: "Format email invalide" })
  email: string;
}
export class userIdDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export enum VerificationTokenTypeDto {
  initial_verification = "initial_verification",
  reset_email = "reset_email",
  resend_email_verification = "resend_email_verification",
}

export type UpdateVerificationTokenDto = {
  isUsed?: boolean;
  expiresAt?: Date;
};

export type ResetPasswordEmailDto = {
  email?: string;
  resetLink?: string;
};

export type UserUpdateConfirmDto = {
  emailVerifiedDate?: Date | null;
  emailVerified?: boolean | null;
};

export type AuthTokenDto = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  email: string;
  sub: string;
};
