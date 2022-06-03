import { Logger } from '@nestjs/common';
import { EntityResults, PaginateParams } from '@shared';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entities';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    private readonly logger = new Logger(PostRepository.name);
    private readonly SELECT_POST_SCOPE = ['post'];

    async findAll({
        order,
        limit,
        page,
    }: Partial<PaginateParams>): Promise<EntityResults<PostEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('post')
                .select(this.SELECT_POST_SCOPE)
                .orderBy('user.createdAt', order)
                .skip(limit * (page - 1))
                .take(limit)
                .getManyAndCount();
            return { entities, count };
        } catch (err) {
            this.logger.error(err);
        }
    }
}
