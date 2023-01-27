import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { ClassUser } from "./ClassUser";
import { ClassUserComments } from "./ClassUserComments";
import { Sport } from "./Sport";

@Entity('classes')
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    sportId: number;

    @Column({ default: 'notSet'})
    ageLevel: string;

    @Column()
    duration: string;

    @Column()
    start: number;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;
    
    @ManyToOne(type => Sport, sport => sport.classes, { onDelete: 'CASCADE', eager: true })
    sport: Sport;

    classUsers: ClassUser

    classComment: ClassUserComments
}
