import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Class } from "./Class";
import { User } from "./User";

@Entity('class_user_comments')
export class ClassUserComments {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @Column()
    userId: number;

    @Column()
    classId: number;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;
    
    @ManyToOne(type => User, item => item.userComment, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(type => Class, item => item.classComment, { onDelete: 'CASCADE' })
    class: Class;
}
