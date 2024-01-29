import { UserUpdateConfirmDto } from '../../auth/dto/auth.dto';
import { CreateUserDto } from '../../auth/dto/create.user.dto';
import { ResetPasswordDemandeDto, ResetPasswordConfirmDto } from '../../auth/dto/resetPassword.dto';
import { UserVerificationDto } from '../../auth/dto/user.verification.dto';
import { UserModel } from '../../auth/entities/user.entity';
import { VerificationTokenModel } from '../../auth/entities/verificationToken.entity';

export interface IAuthService {
  createUser(userDto: CreateUserDto): Promise<UserModel>;
  login(user: UserModel): Promise<string | null>;
  resetPasswordDemande(demandeDto: ResetPasswordDemandeDto): Promise<any>;
  resetPasswordConfirm(confirmDto: ResetPasswordConfirmDto): Promise<any>;
  deleteUserById(userId: string): Promise<boolean | any>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  findUserById(userId: string): Promise<UserModel | null>;
  findVerificationTokenById(tokenId: string): Promise<VerificationTokenModel | null>;
  resendVerifyTokenConfirmUser(email: string): Promise<UserModel | null>;
  createVerificationTokenForUser(userVerificationDto: UserVerificationDto): Promise<VerificationTokenModel>;
  verifyTokenConfirmUser(token: string): Promise<UserModel | null>;
  findVerificationTokenByToken(token: string): Promise<VerificationTokenModel | null>;
  updateVerificationTokenExpiration(tokenId: string): Promise<VerificationTokenModel>;
  updateUserConfirmationStatus(userId: string, userUpdateConfirmDto: UserUpdateConfirmDto): Promise<UserModel | null>;
}
