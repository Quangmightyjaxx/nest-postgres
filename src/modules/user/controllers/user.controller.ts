import { Controller, Get, UseFilters } from '@nestjs/common';
import { LocalAuthExceptionFilter, LoggedInAuth, Page, ReqUser, User } from '@shared';
import { image, name } from 'faker';
import { UserService } from '../user.service';

@Controller()
@UseFilters(LocalAuthExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @LoggedInAuth()
    @Get('/profile')
    @Page('profile')
    async getProfile(@User() reqUser: ReqUser) {
        const user = await this.userService.findById(reqUser.id, reqUser);
        const pet = { image: image.cats(400, 200), name: name.firstName() }; // just random something to render at FE
        return { user: { ...user, pet } };
    }
}
