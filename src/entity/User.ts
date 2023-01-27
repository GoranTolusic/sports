import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ClassUser } from "./ClassUser";
import { ClassUserComments } from "./ClassUserComments";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password?: string;

    @Column({ default: 'author' })
    role: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ select: false })
    verifyToken: string;

    @Column()
    age: string;

    @Column({ default: true })
    active: boolean;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    classUsers: ClassUser

    userComment: ClassUserComments
}
