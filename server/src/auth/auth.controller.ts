import { Body, Controller, Get, Put, Post, Query, Request, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ConfirmUserDto, EmailDto, userIdDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDemandeDto, ResetPasswordConfirmDto } from './dto/resetPassword.dto';
import { JwtAuthGuard } from './strategies/local/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.authService.createUser(createUserDto);
      return {
        success: true,
        message: 'Votre compte a bien été crée avec success! Un mail de confirmation vous a été envoyé',
        data: userCreated,
      };
    } catch (error) {
      return { success: false, message: "Error lors de creation de l'user!", error: error.message };
    }
  }

  @Post('confirm') // Utilisation du décorateur Post pour cette route
  async confirmUser(@Query() confirmUserDto: ConfirmUserDto) {
    try {
      await this.authService.verifyTokenConfirmUser(confirmUserDto.token);
      return { success: true, message: "L'e-mail de confirmation a été confirmé avec succès." };
    } catch (error) {
      return { success: false, message: "Erreur lors de la confirmation de l'email.", error: error.message };
    }
  }

  @Post('resend-confirm')
  async resendMailConfirmUser(@Query() emailDto: EmailDto) {
    try {
      await this.authService.resendVerifyTokenConfirmUser(emailDto.email);
      return { success: true, message: "L'e-mail de confirmation a été renvoyé avec succès." };
    } catch (error) {
      return { success: false, message: "Erreur lors du renvoi de l'e-mail de confirmation.", error: error.message };
    }
  }
  @Post('demande-reset-password')
  async sendCodeResetPassword(@Body() demandeResetPasswordDto: ResetPasswordDemandeDto) {
    try {
      await this.authService.resetPasswordDemande(demandeResetPasswordDto);
      return { success: true, message: 'Le code de reinisialisation du mot de passe a été renvoyé avec succès.' };
    } catch (error) {
      return {
        success: false,
        message: "Erreur lors du renvoi de l'e-mail de reinisialisation du mot de passe.",
        error: error.message,
      };
    }
  }
  @Put('reset-password')
  async ResetPassword(@Body() resetPasswordConfirmDto: ResetPasswordConfirmDto) {
    try {
      await this.authService.resetPasswordConfirm(resetPasswordConfirmDto);
      return { success: true, message: 'Le mot de passe a été réinisialisé avec succès.' };
    } catch (error) {
      return { success: false, message: 'Erreur lors de la reinisialisation du mot de passe.', error: error.message };
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    const user = req.user;
    const access_token = await this.authService.login(user);
    return { access_token, user };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteProfile(@Query() userIDdto: userIdDto) {
    console.log('id,', userIDdto);
    return this.authService.deleteUserById(userIDdto.userId);
  }
}
