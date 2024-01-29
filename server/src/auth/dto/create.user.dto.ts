import { IsString, MinLength, IsEmail, MaxLength, Matches } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
  @MaxLength(20, { message: "Le nom doit contenir au maximum 20 caractères" })
  name: string = "";

  @IsEmail({}, { message: "Format email invalide" })
  email: string = "";

  @MinLength(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  })
  @MaxLength(32, {
    message: "Le mot de passe peut pas contenir plus de 32 caractères",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
  })
  password: string = "";
}
// au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial

export class UpdateUserDto extends PartialType(CreateUserDto) {}
