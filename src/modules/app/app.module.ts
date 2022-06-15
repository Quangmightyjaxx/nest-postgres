import { AuthModule } from '@auth/auth.module';
import { redisPort, redisUrl, roles } from '@config';
// import { FcmModule } from '@doracoder/fcm-nestjs';
import { FileUploaderModule } from '@file-uploader/file-uploader.module';
import { LocalesModule } from '@locales/locales.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@redis/redis.module';
import { SitemapModule } from '@sitemap/sitemap.module';
import { UserModule } from '@user/user.module';
import { AccessControlModule } from 'nest-access-control';
// import path from 'path';
import { AppController } from './controllers';
import { AppService } from './services';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AccessControlModule.forRoles(roles),
        BullModule.forRootAsync({
            useFactory: () => ({
                redis: {
                    host: redisUrl,
                    port: redisPort,
                },
            }),
        }),
        AuthModule,
        UserModule,
        ProfileModule,
        FileUploaderModule,
        SitemapModule,
        RedisModule,
        LocalesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
