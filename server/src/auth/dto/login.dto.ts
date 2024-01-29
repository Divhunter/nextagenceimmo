import { MinLength, MaxLength, Matches } from "class-validator";

export class LoginDto {
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Le format de l'email n'est pas vallide!",
  })
  email: string;

  @MinLength(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  })
  @MaxLength(32, {
    message: "Le mot de passe peut pas contenir plus de 32 caractères",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
  })
  password: string;
}
