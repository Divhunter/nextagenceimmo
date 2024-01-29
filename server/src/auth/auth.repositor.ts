/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IAuthRepository } from "../abstractions/auth/auth.repository.interface";
import { UserUpdateConfirmDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/create.user.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { UserVerificationDto } from "./dto/user.verification.dto";
import { UserModel } from "./entities/user.entity";
import { VerificationTokenModel } from "./entities/verificationToken.entity";

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async resetPassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<UserModel> {

        const userUpdated = await this.prismaService.user.update({
            where: {
                email: email
            },
            data: resetPasswordDto
        });
        return userUpdated;
    }

    async createUser(userDto: CreateUserDto): Promise<UserModel> {
        const newUser = await this.prismaService.user.create({
            data: userDto
        })
        return newUser;
    }

    async deleteUserById(userId: string): Promise<any> {
            // Supprimer tous les VerificationTokens de l'utilisateur
            await this.prismaService.verificationToken.deleteMany({
              where: {
                userId: userId
              }
            });
          
            // Supprimer tous les Accounts de l'utilisateur
            await this.prismaService.account.deleteMany({
              where: {
                userId: userId
              }
            });
          
            // Supprimer toutes les Sessions de l'utilisateur
            await this.prismaService.session.deleteMany({
              where: {
                userId: userId
              }
            });
          
            // Finalement, supprimer l'utilisateur
          
        const user = await this.prismaService.user.delete({
            where: { id: userId }
        })
        return user;
    }

    async createVerificationTokenForUser(userVerificationDto: UserVerificationDto): Promise<VerificationTokenModel> {
        const newVerificationToken = await this.prismaService.verificationToken.create({
            data: userVerificationDto
        })
        return newVerificationToken;
    }

    async findUserByEmail(email: string): Promise<UserModel> {
        const user = await this.prismaService.user.findUnique({
            where: { email }
        })
        return user;
    }

    async findUserById(userId: string): Promise<UserModel> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    }

    async findVerificationTokenById(tokenId: string): Promise<VerificationTokenModel> {
        const tokenVerification = await this.prismaService.verificationToken.findUnique({
            where: {
                id: tokenId
            }
        })
        return tokenVerification;
    }

    async findVerificationTokenByToken(token: string): Promise<VerificationTokenModel> {
        const tokenVerification = await this.prismaService.verificationToken.findUnique({
            where: {
                token: token
            }
        })
        return tokenVerification;
    }

    async updateVerificationTokenExpiration(tokenId: string): Promise<VerificationTokenModel> {
        const verificationTokenUpdated = await this.prismaService.verificationToken.update({
            where: {
                id: tokenId
            },
            data: { isUsed: true, expiresAt: new Date().toISOString() }
        })
        return verificationTokenUpdated;
    }

    async updateUserConfirmationStatus(userId: string, userUpdateConfirmDto: UserUpdateConfirmDto): Promise<UserModel> {
        const user = await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: userUpdateConfirmDto
        })
        return user;
    }

}