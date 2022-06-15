import { AppResources } from '@config';
import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { AppPermissionBuilder, EnumOrder, ReqUser } from '@shared';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateProfileDTO } from './dtos';
import { ProfileEntity } from './entities';
import { ProfileRepository } from './repositories';
import { Connection } from 'typeorm';
import { UserEntity } from '@modules/user/entities';

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
        private connection: Connection,
    ) {}

    findByUsername(id: string): Promise<ProfileEntity> {
        return this.profileRepository.findOne({ id });
    }
    async uowInsertProfile(data: CreateProfileDTO) {
        // create a new query runner
        const queryRunner = this.connection.createQueryRunner();
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // now we can execute any queries on a query runner, for example:
        // lets now open a new transaction:
        await queryRunner.startTransaction();
        try {
            // execute some operations on this transaction:
            // await this.profileRepository.save(data);
            await queryRunner.manager.save(ProfileEntity, data);
            await queryRunner.manager.save(UserEntity, data);
            // commit transaction now:
            await queryRunner.commitTransaction();
            return { message: 'OK' };
        } catch (err) {
            console.log(err);
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(err.toString());
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }

    async findById(userId: string, reqUser: ReqUser): Promise<ProfileEntity> {
        const permission = new AppPermissionBuilder()
            .setRolesBuilder(this.rolesBuilder)
            .setRequestUser(reqUser)
            .setAction('read')
            .setResourceName(AppResources.USER)
            .setCreatorId(userId)
            .build()
            .grant();

        if (permission.granted) {
            const user = await this.profileRepository.findOne(userId);
            if (!user) {
                throw new HttpException(
                    `User with ID: ${userId} not found!`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return permission.filter(user);
        } else {
            throw new HttpException(
                `You don't have permission to do this!`,
                HttpStatus.FORBIDDEN,
            );
        }
    }

    async findAll(): Promise<any> {
        try {
            const data = await this.profileRepository.findAll({
                order: EnumOrder.ASC,
                limit: 10,
                page: 1,
            });
            return data;
        } catch (err) {
            throw new HttpException(`${err.detail}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(data: CreateProfileDTO, reqUser: ReqUser): Promise<ProfileEntity> {
        const permission = new AppPermissionBuilder()
            .setRolesBuilder(this.rolesBuilder)
            .setRequestUser(reqUser)
            .setAction('create')
            .setResourceName(AppResources.USER)
            .build()
            .grant();

        if (permission.granted) {
            data = permission.filter(data);
            const user = this.profileRepository.create(data);
            try {
                return await this.profileRepository.save(user);
            } catch (err) {
                throw new HttpException(`${err.detail}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException(
                `You don't have permission to do this!`,
                HttpStatus.FORBIDDEN,
            );
        }
    }

    async delete(userId: string, reqUser: ReqUser) {
        const permission = new AppPermissionBuilder()
            .setRolesBuilder(this.rolesBuilder)
            .setRequestUser(reqUser)
            .setAction('delete')
            .setResourceName(AppResources.USER)
            .setCreatorId(userId)
            .build()
            .grant();

        if (permission.granted) {
            try {
                const user = await this.findById(userId, reqUser);
                if (!user) {
                    throw new HttpException(
                        `User with ID: ${userId} not found!`,
                        HttpStatus.NOT_FOUND,
                    );
                } else {
                    try {
                        await this.profileRepository.delete(userId);
                        return { message: 'OK' };
                    } catch (err) {
                        throw new HttpException(
                            `${err.detail}`,
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }
                }
            } catch (err) {
                throw new HttpException(`${err.detail}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException(
                `You don't have permission to do this!`,
                HttpStatus.FORBIDDEN,
            );
        }
    }
}
