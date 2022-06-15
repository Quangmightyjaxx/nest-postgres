import { Body, Controller, Post } from '@nestjs/common';
import { JwtAuth, JwtRefreshAuth, ReqUser, User } from '@shared';
import { CreateUserDTO } from '@modules/user/dtos';
import { LoginInputDTO } from '../dtos';
import { AuthService } from '@modules/auth/services';
import { UserService } from '@modules/user/user.service';
import { ProfileService } from '@modules/profile/profile.service';
import { CreateProfileDTO } from '@modules/profile/dtos';

@Controller('jwt')
export class JwtAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
    ) {}

    @Post('login')
    login(@Body() data: LoginInputDTO) {
        return this.authService.jwtLogin(data);
    }

    @JwtRefreshAuth()
    @Post('refresh')
    refresh(@User() user: ReqUser) {
        return this.authService.jwtRefresh(user);
    }
    @JwtAuth()
    @Post('profile')
    testGetRelationship(@Body() data: CreateProfileDTO) {
        return this.profileService.uowInsertProfile(data);
    }

    @JwtAuth()
    @Post('register')
    register(@Body() data: CreateUserDTO, @User() reqUser: ReqUser) {
        return this.authService.jwtRegister(data, reqUser);
    }
}
