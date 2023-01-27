import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Class } from "./Class";
import { Sport } from "./Sport";
import { User } from "./User";

@Entity('class_users')
export class ClassUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rating: number

    @Column()
    userId: number;

    @Column()
    classId: number;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;
    
    @ManyToOne(type => User, item => item.classUsers, { onDelete: 'CASCADE', eager: true })
    user: User;

    @ManyToOne(type => Class, item => item.classUsers, { onDelete: 'CASCADE', eager: true })
    class: Class;
}
