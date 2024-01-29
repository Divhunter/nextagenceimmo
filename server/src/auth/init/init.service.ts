import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    const emailAdmin = this.config.get<string>('APP_IDENTIFIANT');
    const passwordAdmin = this.config.get<string>('APP_PASSWORD');

    const hashedPassword = await bcrypt.hash(passwordAdmin, 10);

    const adminUser = await this.prismaService.user.findUnique({
      where: { email: emailAdmin },
    });

    if (!adminUser) {
      const createAdmin: User = {
        name: 'Admin',
        email: emailAdmin,
        password: hashedPassword,
        image: '',
        role: 'admin',
        emailVerified: true,
        id: '',
        emailVerifiedDate: new Date(),
      };

      const normaliseEmail = createAdmin.email.toLowerCase();
      createAdmin.email = normaliseEmail;

      Reflect.deleteProperty(createAdmin, 'id');
      await this.prismaService.user.create({
        data: createAdmin,
      });
      console.log('admin created!');
    }
  }
}
