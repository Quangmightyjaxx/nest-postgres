import { IBaseModel } from '@shared';
import {
    AfterLoad,
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostModel } from '../dtos';

@Entity('post')
export class PostEntity extends BaseEntity implements IBaseModel<PostModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: false })
    avatarUrl: string;

    @Column({ type: 'text', nullable: false })
    postContent: string;
    @Column({ type: 'text', nullable: false })
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    type: string;

    @AfterLoad()
    insertType(): void {
        this.type = 'user';
    }
}
