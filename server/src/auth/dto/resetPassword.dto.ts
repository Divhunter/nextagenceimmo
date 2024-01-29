import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDemandeDto {
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordConfirmDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly code: string;
}
export class ResetPasswordDto {
  @IsNotEmpty()
  readonly password: string;
}
