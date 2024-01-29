/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConflictException, BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
import * as speakeasy from 'speakeasy';
import { IAuthService } from "../abstractions/auth/auth.service.interface";
import { AuthRepository } from "./auth.repositor";
import { VerificationTokenTypeDto, UserUpdateConfirmDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/create.user.dto";
import { ResetPasswordConfirmDto, ResetPasswordDto, ResetPasswordDemandeDto } from "./dto/resetPassword.dto";
import { UserVerificationDto } from "./dto/user.verification.dto";
import { UserModel } from "./entities/user.entity";
import { VerificationTokenModel } from "./entities/verificationToken.entity";
import { MailService } from "../communs/utils/mail.service";
import { TokenService } from "../communs/utils/token.service";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
        private config: ConfigService,
    ) { }

    // Modification du mot de passe.
    async resetPasswordConfirm(confirmDto: ResetPasswordConfirmDto): Promise<any> {
        const { email, password, code } = confirmDto;
        const secretKey = this.config.get<string>('OTP_CODE_SECRET');
        const expireOtp = this.config.get<number>('OTP_CODE_EXPIRE');

        const user = await this.findUserByEmail(email);
        if (!user) throw new NotFoundException("Ce compte n'existe pas!")

        const match = speakeasy.totp.verify({
            secret: secretKey,
            digits: 5,
            step: 60 * expireOtp,
            encoding: "base64",
            token: code
        })

        if (!match) throw new UnauthorizedException("Invalid/Expire code");
        const passwordHash = await bcrypt.hash(password, 10);

        const resetPasswordDto: ResetPasswordDto = {
            password: passwordHash
        }
        const userPasswordUpdated = await this.authRepository.resetPassword(email, resetPasswordDto);
        return userPasswordUpdated;
    }

    // Demander une reinisialisation du mot de passe.
    async resetPasswordDemande(demandeDto: ResetPasswordDemandeDto): Promise<any> {
        const { email } = demandeDto;
        const secretKey = this.config.get<string>('OTP_CODE_SECRET');
        const expireOtp = this.config.get<number>('OTP_CODE_EXPIRE');

        const user = await this.findUserByEmail(email);
        if (!user) throw new NotFoundException("Ce compte n'existe pas!");

        const code = speakeasy.totp({
            secret: secretKey,
            digits: 5,
            step: 60 * expireOtp,
            encoding: "base64"
        })
        await this.mailService.sendCodeResetPassword(email, user.name, code)
    }


    async login(user: UserModel): Promise<string> {
        const secretKey = this.config.get<string>('JWT_SECRET_KEY');
        const expireToken = this.config.get<number>('JWT_SECRET_EXPIRE');
        const payload = { email: user.email, sub: user.id, role:user.role };
        try {
            const access_token = this.jwtService.sign(payload, { secret: secretKey, expiresIn: expireToken })
            return access_token;
        } catch (error) {
            console.error("error creating token login:", error)
            throw new InternalServerErrorException(error.message)
        }

    }


    async createUser(createUserDdo: CreateUserDto): Promise<UserModel> {
        const existingUser = await this.isUserExist(createUserDdo.email)

        if (existingUser) {
            throw new ConflictException('User already exist.');
        } else {
            try {
                const hashedPassword = await bcrypt.hash(createUserDdo.password, 10);
                createUserDdo.password = hashedPassword;

                const normaliseEmail = createUserDdo.email.toLowerCase()
                createUserDdo.email = normaliseEmail;

                const userCreated = await this.authRepository.createUser(createUserDdo);

                const verificationTokenCreated = await this.createVerificationToken(userCreated, VerificationTokenTypeDto.initial_verification);

                // Envoyez l'email avec le lien de vérification
                // Envoi de l'email de confirmation avec un token unique
                const emailSended = await this.sendVerificationEmail(userCreated.email, userCreated.name, verificationTokenCreated.token);
                if (!emailSended) {
                    console.log("error to send mail")
                }
                Reflect.deleteProperty(userCreated, "password");
                return userCreated;
            } catch (error) {
                console.error(error)
                throw new Error(`Error creating User `);
            }
        }
    }
    async deleteUserById(userId: string): Promise<any> {
        const user = await this.authRepository.findUserById(userId);
        if (!user) throw new NotFoundException("Ce compte n'existe pas")
        const userDeleted = await this.authRepository.deleteUserById(userId)
        Reflect.deleteProperty(userDeleted, "password");
        return userDeleted;
    }

    async resendVerifyTokenConfirmUser(email: string): Promise<UserModel> {
        try {
            const user = await this.findUserByEmail(email);
            if (!user) {
                throw new NotFoundException('No user found with this email');
            }
            if (user.emailVerified) {
                throw new ConflictException('Email deja verifié! veillez vous connecter');
            }

            // Enregistrez le token dans votre repository
            const verificationTokenCreated = await this.createVerificationToken(user, VerificationTokenTypeDto.resend_email_verification);
            // Envoyez l'email avec le lien de vérification
            // Envoi de l'email de confirmation avec un token unique
            const emailSended = await this.sendVerificationEmail(user.email, user.name, verificationTokenCreated.token);
            if (!emailSended) {
                console.log("error to send mail")
            }
            return user;
        } catch (error) {
            throw new BadRequestException('Error to resend mailVerification.')
        }
    }

    // Verifions le token recu pour la confirmation du register d'un user
    async verifyTokenConfirmUser(token: string): Promise<UserModel | null> {
        const secretKey = this.config.get<string>('EMAIL_VERIFICATION_SECRET')
        try {
            const tokenDecoded = await this.tokenService.verifyToken(token, secretKey)
            if (tokenDecoded.userId) {
                const userToVerify = await this.findUserById(tokenDecoded.userId)
                if (userToVerify?.emailVerified) {
                    throw new HttpException('Email déjà vérifié', HttpStatus.BAD_REQUEST)
                }
            }
            // Recherche du token JWT stocké dans votre repository
            const verificationToken = await this.findVerificationTokenByToken(token);

            if (!verificationToken) {
                console.error('Token not found or expired')
                throw new BadRequestException('Token not found or expired');
            }

            // Récupération du token JWT stocké en base de données associé à l'utilisateur
            const storedToken = verificationToken.token;

            // Vérification de la validité du token et de son type
            if (verificationToken.isUsed) {
                console.error('token already used')
                throw new Error('token already used');
            }
            if (token !== storedToken) {
                console.error('Token no Mach of in stored in server');
                throw new BadRequestException('Token no Mach of in stored in server');
            }

            // Récupération de l'utilisateur associé au token
            const user = await this.authRepository.findUserById(verificationToken.userId);

            if (!user) {
                console.error("Ce compte n'existe pas")
                throw new NotFoundException('User of this token not found');
            }

            // Désactiver tous les jetons précédents de l'utilisateur
            // await this.deactivatePreviousTokens(user.id);

            // Marquer le token comme utilisé dans votre repository
            await this.updateVerificationTokenExpiration(verificationToken.id);

            // Mettre à jour l'état de la vérification de l'email de l'utilisateur
            const userUpdateConfirmDto: UserUpdateConfirmDto = {
                emailVerified: true,
                emailVerifiedDate: new Date()
            }
            const userConfirmed = await this.updateUserConfirmationStatus(user.id, userUpdateConfirmDto);

            return userConfirmed; // Utilisateur vérifié avec succès
        } catch (error) {
            throw new BadRequestException(`${error.message}`);
        }
    }


    async createVerificationTokenForUser(userVerificationDto: UserVerificationDto): Promise<VerificationTokenModel> {
        try {
            return await this.authRepository.createVerificationTokenForUser(userVerificationDto);
        } catch (error) {
            throw new BadRequestException('Erreur to create Verification token');
        }
    }
    async findUserByEmail(email: string): Promise<UserModel> {
        try {
            return await this.authRepository.findUserByEmail(email);
        } catch (error) {
            throw new BadRequestException('Error to fetch User.');
        }
    }
    async findUserById(userId: string): Promise<UserModel> {
        try {
            return await this.authRepository.findUserById(userId);
        } catch (error) {
            console.error(error)
            throw new BadRequestException("Erreur lors de la recuperation de l'user");
        }
    }
    async findVerificationTokenById(tokenId: string): Promise<VerificationTokenModel> {
        try {
            return await this.authRepository.findVerificationTokenById(tokenId);
        } catch (error) {
            console.error(error)
            throw new BadRequestException("Erreur lors de la recuperation de l'user");
        }
    }
    async findVerificationTokenByToken(token: string): Promise<VerificationTokenModel> {
        try {
            return await this.authRepository.findVerificationTokenByToken(token);
        } catch (error) {
            console.error(error)
            throw new BadRequestException("Erreur lors de la recuperation de l'user");
        }
    }
    async updateVerificationTokenExpiration(tokenId: string): Promise<VerificationTokenModel> {
        try {
            return await this.authRepository.updateVerificationTokenExpiration(tokenId);
        } catch (error) {
            console.error(error)
            throw new BadRequestException("Erreur lors de la recuperation de l'user");
        }
    }
    async updateUserConfirmationStatus(userId: string, userUpdateConfirmDto: UserUpdateConfirmDto): Promise<UserModel> {
        try {
            return await this.authRepository.updateUserConfirmationStatus(userId, userUpdateConfirmDto);
        } catch (error) {
            console.error(error)
            throw new BadRequestException("Erreur lors de la recuperation de l'user");
        }
    }


    //*******  Fonction commun ou generique    *****//

    // Verifier si l'utilisateur existe ou pas 
    async isUserExist(email: string): Promise<boolean> {
        const existingUser = await this.findUserByEmail(email);
        return existingUser ? true : false;
    }

    // Verifier de l'user pour la connexion


    // Fonction d'envoie d'email de verification et qui fait 3 tentatives s'il y a eu error lors du premiers d'entative.
    async sendVerificationEmail(email: string, name: string, token: string, retries = 3): Promise<boolean> {
        try {
            // Code d'envoi d'email avec le token de vérification
            await this.mailService.sendRegisterConfirmation(email, name, token);
            return true;
        } catch (error) {
            if (retries > 0) {
                // Tentative de réessai si une erreur se produit
                return await this.sendVerificationEmail(email, name, token, retries - 1);
            } else {
                // Si le nombre de tentatives est atteint, renvoie une erreur
                console.error(error);
                throw new BadRequestException('Failed to send verification email after multiple attempts');

            }
        }
    }

    // Fonction pour générer le token
    async generateToken(userId: string, email: string, secretKey: string, expiresIn: string): Promise<string> {
        const payload = {
            sub: userId,
            email: email,
        };
        // Génération du token avec JWT signé
        const token = this.jwtService.sign(payload, {
            expiresIn: expiresIn, secret: secretKey
        });
        return token;
    };

    // Methode qui se charge de la creation du token et le sauvegarder dans la base des données.
    async createVerificationToken(user: UserModel, tokenType: VerificationTokenTypeDto): Promise<VerificationTokenModel> {
        const secretKey = this.config.get<string>('EMAIL_VERIFICATION_SECRET')
        const expireTokenVerification = this.config.get<string>('EMAIL_VERIFICATION_TOKEN_EXPIRE');
        let verificationToken = "";
        if (typeof secretKey === 'string') {
            verificationToken = await this.generateToken(user.id, user.email, secretKey, expireTokenVerification);
        } else {
            console.error('La clé secrète n\'est pas définie ou n\'est pas une chaîne de caractères valide');
        }

        const newVerificationDto: UserVerificationDto = {
            userId: user.id,
            token: verificationToken,
            isUsed: false,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(),
            type: tokenType
        }

        const verificationTokenCreated = await this.createVerificationTokenForUser(newVerificationDto);
        return verificationTokenCreated;
    }

}