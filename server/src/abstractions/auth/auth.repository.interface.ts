import { UserUpdateConfirmDto } from '../../auth/dto/auth.dto';
import { CreateUserDto } from '../../auth/dto/create.user.dto';
import { ResetPasswordDto } from '../../auth/dto/resetPassword.dto';
import { UserVerificationDto } from '../../auth/dto/user.verification.dto';
import { UserModel } from '../../auth/entities/user.entity';
import { VerificationTokenModel } from '../../auth/entities/verificationToken.entity';

export interface IAuthRepository {
  createUser(userDto: CreateUserDto): Promise<UserModel>;
  deleteUserById(userId: string): Promise<boolean | any>;
  resetPassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<UserModel>;
  createVerificationTokenForUser(userVerificationDto: UserVerificationDto): Promise<VerificationTokenModel>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  findUserById(userId: string): Promise<UserModel | null>;
  findVerificationTokenById(tokenId: string): Promise<VerificationTokenModel | null>;
  findVerificationTokenByToken(token: string): Promise<VerificationTokenModel | null>;
  updateVerificationTokenExpiration(tokenId: string): Promise<VerificationTokenModel>;
  updateUserConfirmationStatus(userId: string, userUpdateConfirmDto: UserUpdateConfirmDto): Promise<UserModel | null>;
}
