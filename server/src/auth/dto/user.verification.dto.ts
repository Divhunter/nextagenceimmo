import { IsNotEmpty, IsString, IsBoolean, IsDateString } from "class-validator";
import { VerificationTokenTypeDto } from "./auth.dto";

export class UserVerificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string = "";

  @IsNotEmpty()
  @IsString()
  token: string = "";
  @IsBoolean()
  isUsed: boolean = false;

  @IsDateString()
  createdAt: string = new Date().toISOString();

  @IsDateString()
  expiresAt: string = new Date().toISOString();

  @IsNotEmpty()
  @IsString()
  type!: VerificationTokenTypeDto;
}
