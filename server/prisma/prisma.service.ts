import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  cleanDb() {
    return this.$transaction([this.user.deleteMany(), this.verificationToken.deleteMany(), this.session.deleteMany(), this.account.deleteMany()]);
  }
}
