import { AppRoles } from '@config';
import { ProfileEntity } from '@modules/profile/entities';
import { IBaseModel } from '@shared';
import bcrypt from 'bcrypt';
import { AvatarGenerator } from 'random-avatar-generator';
import {
    AfterLoad,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IUserModel } from '../dtos';

const avatarGenerator = new AvatarGenerator();

@Entity('user')
export class UserEntity extends BaseEntity implements IBaseModel<IUserModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'text', nullable: false })
    avatarUrl: string;

    @Column({ type: 'text', nullable: false, unique: true })
    username: string;

    @Column({ type: 'text', nullable: true, unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: true, unique: true })
    phoneNumber: string;

    @Column({ type: 'simple-array', default: AppRoles.CUSTOMER })
    roles: AppRoles[];
    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    type: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    randomAvatar(): void {
        this.avatarUrl = avatarGenerator.generateRandomAvatar(this.username);
    }

    comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }

    @AfterLoad()
    insertType(): void {
        this.type = 'user';
    }
}
