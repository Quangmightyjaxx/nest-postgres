import { UserEntity } from '@modules/user/entities';
import { IBaseModel } from '@shared';
import {
    AfterLoad,
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProfileModal } from '../dtos';

@Entity('profile')
export class ProfileEntity extends BaseEntity implements IBaseModel<ProfileModal> {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'user_id', nullable: true })
    user_id: string;

    @Column({ name: 'avatar', nullable: true })
    avatar: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ name: 'gender', nullable: true })
    gender: boolean;

    @Column({ name: 'position', nullable: true })
    position: boolean;

    @Column({
        name: 'birthday',
        default: null,
        nullable: true,
    })
    birthday: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date;

    @OneToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;
    type: string;
    @AfterLoad()
    insertType(): void {
        this.type = 'user';
    }
}
