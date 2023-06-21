import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity  } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    @Exclude()
    refresh_token?: string;
}