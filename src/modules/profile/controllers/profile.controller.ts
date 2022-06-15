import { Get } from '@nestjs/common';
import { ApiV1Controller } from '@shared';
import { ProfileService } from '../profile.service';
// @Controller()
// @UseFilters(LocalAuthExceptionFilter)
@ApiV1Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}
    @Get()
    async getProfile() {
        const result = await this.profileService.findAll();
        return result;
    }
}
