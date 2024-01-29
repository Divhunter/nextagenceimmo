import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const secretKey = process.env.SECRET_KEY_RECAPTCHA;
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

    const { data } = await this.httpService
      .post(verificationUrl, null, {
        params: {
          secret: secretKey,
          response: body.recaptchaResponse,
        },
      })
      .toPromise();

    if (!data.success) {
      throw new HttpException(
        {
          status: 'CAPTCHA_VALIDATION_FAILED',
          error: `La validation du CAPTCHA a échouée`,
          message: 'Veuillez révalider le CAPTCHA',
        },
        403,
      );
    }

    return true;
  }
}
