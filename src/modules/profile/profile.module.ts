import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './controllers';
import { ProfileRepository } from './repositories/profile.repository';
import { ProfileService } from './profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileRepository])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
