import { Logger } from '@nestjs/common';
import { EntityResults, PaginateParams } from '@shared';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from '../entities';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
    private readonly logger = new Logger(ProfileRepository.name);
    private readonly SELECT_POST_SCOPE = ['profile'];

    async findAll({
        order,
        limit,
        page,
    }: Partial<PaginateParams>): Promise<EntityResults<ProfileEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('profile')
                .select(this.SELECT_POST_SCOPE)
                .orderBy('profile.createdAt', order)
                .skip(limit * (page - 1))
                .take(limit)
                .getManyAndCount();
            return { entities, count };
        } catch (err) {
            this.logger.error(err);
        }
    }
}
