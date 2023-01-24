import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    @Column({ default: true })
    active: boolean;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

}
